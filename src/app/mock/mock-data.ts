
/* ------------------ PERMISSIONS ------------------ */

import { Permission, Role } from "../core/models/permission.model";
import { UserLoginResponse } from "../core/models/user.model";

const MOCK_PERMISSIONS: Permission[] = [
  {
    id: 'perm-users-read',
    name: 'Read users',
    description: 'Can read users list',
    resource: 'users',
    action: 'read'
  },
  {
    id: 'perm-users-create',
    name: 'Create users',
    description: 'Can create users',
    resource: 'users',
    action: 'create'
  },
  {
    id: 'perm-admin-read',
    name: 'Admin access',
    description: 'Can access admin area',
    resource: 'admin',
    action: 'read'
  }
];

/* ------------------ ROLE ------------------ */

const MOCK_ADMIN_ROLE: Role = {
  id: 'role-admin',
  name: 'Admin',
  description: 'Administrator role',
  permissions: MOCK_PERMISSIONS,
  isActive: true
};

/* ------------------ LOGIN RESPONSE ------------------ */

export const MOCK_LOGIN_RESPONSE: UserLoginResponse = {
  user: {
    id: 'user-001',
    email: 'admin@example.com',
    firstName: 'Mario',
    lastName: 'Rossi',
    avatar: 'https://i.pravatar.cc/150?img=12',
    roles: [MOCK_ADMIN_ROLE],
    isActive: true,
    createdAt: new Date('2024-01-01T09:00:00Z'),
    updatedAt: new Date()
  },
  token: 'mock-jwt-token-123456789',
  refreshToken: 'mock-refresh-token-abcdef',
  expiresIn: 3600
};
