import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/**
 * TenantDbService manages per-tenant PrismaClient instances.
 */
@Injectable()
export class TenantDbService implements OnModuleDestroy {
  // Cache: schemaName → PrismaClient
  private readonly clients = new Map<string, PrismaClient>();

  // Raw pg pool used for DDL operations
  readonly rawPool: Pool;

  constructor() {
    this.rawPool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  /**
   * Returns a cached PrismaClient scoped to the given tenant schema.
   */
  forSchema(schemaName: string): PrismaClient {
    if (this.clients.has(schemaName)) {
      return this.clients.get(schemaName)!;
    }

    const baseUrl = process.env.DATABASE_URL!;
    const url = new URL(baseUrl);
    url.searchParams.set('schema', schemaName);

    const pool = new Pool({ connectionString: url.toString() });
    const adapter = new PrismaPg(pool as any);
    
    const client = new PrismaClient({ adapter });

    this.clients.set(schemaName, client);
    return client;
  }

  async onModuleDestroy() {
    for (const client of this.clients.values()) {
      await client.$disconnect();
    }
    await this.rawPool.end();
  }
}
