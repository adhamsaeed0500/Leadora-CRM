import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../database/prisma.service';

/**
 * Global middleware to extract the tenant from JWT (if present)
 * and attach it to the request object. This happens BEFORE guards.
 */
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.decode(token) as any;
        if (decoded && decoded.tenantId) {
          const tenant = await this.prisma.tenant.findUnique({
            where: { id: decoded.tenantId },
          });

          if (tenant) {
            (req as any).tenant = tenant;
          }
        }
      } catch (err) {
        // We do not throw an error here, because some routes are public.
        // The JwtAuthGuard is responsible for blocking unauthenticated requests.
      }
    }

    next();
  }
}
