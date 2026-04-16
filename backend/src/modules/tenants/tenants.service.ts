import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';
import { SchemaRunnerService } from './schema-runner.service';

@Injectable()
export class TenantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly schemaRunner: SchemaRunnerService,
  ) {}

  /**
   * Generates a safe and unique PostgreSQL schema name.
   */
  generateSchemaName(companyName: string): string {
    const slug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_') // remove consecutive underscores
      .replace(/^_|_$/g, ''); // trim leading/trailing underscores

    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return `${slug}_${randomSuffix}`;
  }

  /**
   * Orchestrates the creation of a Tenant + Postgres Schema.
   */
  async createTenantWithSchema(companyName: string): Promise<any> {
    const schemaName = this.generateSchemaName(companyName);

    // 1. Create the tenant record in the public schema
    const tenant = await this.prisma.tenant.create({
      data: {
        name: companyName,
        schemaName: schemaName,
      },
    });

    try {
      // 2. Create the physical database schema and tables
      await this.schemaRunner.createSchemaAndTables(schemaName);
      
      // 3. Setup default role and permissions for this tenant
      await this.setupTenantDefaults(tenant.id);

      return tenant;
    } catch (error) {
      // Rollback: if schema creation failed, delete the tenant record
      await this.prisma.tenant.delete({ where: { id: tenant.id } });
      throw new InternalServerErrorException(
        'Failed to setup tenant database schema. Rolled back.',
      );
    }
  }

  private async setupTenantDefaults(tenantId: string) {
    // Basic CRM permissions to be seeded
    const permissions = [
      'leads:read', 'leads:write', 'leads:delete',
      'deals:read', 'deals:write', 'deals:delete',
      'messages:read', 'messages:write',
      'activities:read', 'activities:write'
    ];

    // Ensure permissions exist in the DB (upsert)
    const storedPermissions = [];
    for (const p of permissions) {
      const perm = await this.prisma.permission.upsert({
        where: { name: p },
        update: {},
        create: { name: p },
      });
      storedPermissions.push(perm);
    }

    // Create the default "admin" role for this specific tenant
    const adminRole = await this.prisma.role.create({
      data: {
        name: 'admin',
        tenantId,
      },
    });

    // Link the admin role to all permissions
    const rolePermissionLinks = storedPermissions.map((sp) => ({
      roleId: adminRole.id,
      permissionId: sp.id,
    }));

    await this.prisma.rolePermission.createMany({
      data: rolePermissionLinks,
    });
  }
}
