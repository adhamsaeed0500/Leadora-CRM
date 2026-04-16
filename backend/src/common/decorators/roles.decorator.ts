import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'permissions';

/**
 * Attach required permissions to a route handler.
 * @example @Roles('leads:read', 'leads:write')
 */
export const Roles = (...permissions: string[]) =>
  SetMetadata(ROLES_KEY, permissions);
