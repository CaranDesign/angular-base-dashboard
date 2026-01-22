export type PermissionActions = 'read' | 'create' | 'update' | 'delete';

// Permissions management
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;        // es: 'users', 'reports', 'settings'
  action: PermissionActions;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isActive: boolean;
}

// Typedef for simplifying the applications of permission
export type PermissionKey = `${string}:${PermissionActions}`;
// Es: 'users:create', 'reports:read', 'settings:update'

// Caching permission
export interface PermissionCache {
  permissions: Set<PermissionKey>; //unique values only allowed
  roles: Map<string, Role>;
  lastUpdated: number;
}