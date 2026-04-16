import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/database/prisma.service';
import { TenantsService } from '../tenants/tenants.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tenantsService: TenantsService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { companyName, adminName, email, password } = registerDto;

    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // 1. Create tenant and its dynamic schema in one transaction-like flow
    const tenant = await this.tenantsService.createTenantWithSchema(companyName);

    try {
      // 2. Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // 3. Create Admin user
      const user = await this.prisma.user.create({
        data: {
          name: adminName,
          email,
          passwordHash,
          tenantId: tenant.id,
        },
      });

      // 4. Assign the 'admin' role to the user for this tenant
      const adminRole = await this.prisma.role.findFirst({
        where: { name: 'admin', tenantId: tenant.id },
      });

      if (adminRole) {
        await this.prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: adminRole.id,
          },
        });
      }

      // 5. Generate tokens
      return this.generateTokens(user.id, user.email, tenant.id);
    } catch (error) {
      // Manual cleanup if user creation fails
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id, user.email, user.tenantId);
  }

  async refreshToken(userId: string, refreshToken: string) {
    const storedToken = await this.prisma.refreshToken.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const isValid = await bcrypt.compare(refreshToken, storedToken.tokenHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.generateTokens(user.id, user.email, user.tenantId);
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
    return { success: true };
  }

  private async generateTokens(userId: string, email: string, tenantId: string) {
    const payload = { sub: userId, email, tenantId };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET') || 'FALLBACK_ACCESS_SECRET',
      expiresIn: (this.configService.get<string>('JWT_EXPIRES_IN') || '15m') as any,
    });

    const refreshTokenPlain = require('crypto').randomBytes(32).toString('hex');
    const refreshTokenHash = await bcrypt.hash(refreshTokenPlain, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tenantId,
        tokenHash: refreshTokenHash,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken: refreshTokenPlain,
    };
  }
}
