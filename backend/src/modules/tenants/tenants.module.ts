import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { SchemaRunnerService } from './schema-runner.service';

@Module({
  providers: [TenantsService, SchemaRunnerService],
  exports: [TenantsService],
})
export class TenantsModule {}
