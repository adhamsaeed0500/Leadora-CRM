import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Helper feature to get all permission names for a given user.
   * Joins UserRole -> Role -> RolePermission -> Permission.
   */
  async getUserPermissions(userId: string): Promise<string[]> {
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: { permission: true },
            },
          },
        },
      },
    });

    const permissionNames = new Set<string>();

    for (const ur of userRoles) {
      for (const rp of ur.role.rolePermissions) {
        permissionNames.add(rp.permission.name);
      }
    }

    return Array.from(permissionNames);
  }
}
