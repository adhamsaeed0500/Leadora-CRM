import { Injectable, Logger } from '@nestjs/common';
import { TenantDbService } from '../../common/database/tenant-db.service';

@Injectable()
export class SchemaRunnerService {
  private readonly logger = new Logger(SchemaRunnerService.name);

  constructor(private readonly tenantDbService: TenantDbService) {}

  /**
   * Creates a new PostgreSQL schema and runs the required DDL
   * to set up the multi-tenant base structure (Leads, Deals, etc).
   */
  async createSchemaAndTables(schemaName: string): Promise<void> {
    const client = this.tenantDbService.rawPool;

    try {
      this.logger.log(`Creating schema "${schemaName}"...`);

      await client.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

      // We explicitly set the search_path so the tables are created in the right schema.
      await client.query(`SET search_path TO "${schemaName}"`);

      // Execute DDL for Tenant tables
      await this.runMigrations(client);

      this.logger.log(`Schema "${schemaName}" successfully initialized.`);
    } catch (error) {
      this.logger.error(`Failed to create schema "${schemaName}"`, error);
      throw new Error(`Failed to provision database for tenant`);
    } finally {
      // Revert search path back to public to be safe
      await client.query(`SET search_path TO public`);
    }
  }

  private async runMigrations(client: any): Promise<void> {
    // Basic CRM structure.
    // Tenant IDs are NOT included here because data is isolated by schema.

    const createLeadsTable = `
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(100),
        source VARCHAR(100),
        status VARCHAR(50) DEFAULT 'NEW',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createDealsTable = `
      CREATE TABLE IF NOT EXISTS deals (
        id VARCHAR(100) PRIMARY KEY,
        lead_id VARCHAR(100) REFERENCES leads(id) ON DELETE SET NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(15,2) DEFAULT 0.0,
        status VARCHAR(50) DEFAULT 'OPEN',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createMessagesTable = `
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(100) PRIMARY KEY,
        lead_id VARCHAR(100) REFERENCES leads(id) ON DELETE CASCADE,
        direction VARCHAR(20) NOT NULL, -- 'INBOUND' or 'OUTBOUND'
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createActivitiesTable = `
      CREATE TABLE IF NOT EXISTS activities (
        id VARCHAR(100) PRIMARY KEY,
        lead_id VARCHAR(100) REFERENCES leads(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL, -- 'CALL', 'NOTE', 'MEETING'
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(createLeadsTable);
    await client.query(createDealsTable);
    await client.query(createMessagesTable);
    await client.query(createActivitiesTable);
  }
}
