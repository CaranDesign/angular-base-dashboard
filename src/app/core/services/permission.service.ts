import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Permission, PermissionKey, Role } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  // in-memory cache permission in our state (not real browser cache)
  private permissionCache = new Set<PermissionKey>();
  private roleCache = new Map<string, Role>();
  private currentUser: User | null = null;

  constructor() {}

  // load permisson for logged in user
  loadPermissions(user: User): void {
    this.currentUser = user;
    this.permissionCache.clear();
    this.roleCache.clear();

    // Checking roles of the user
    user.roles.forEach(role => {
      this.roleCache.set(role.id, role);
      // for every role in user add the role to permissionCache
      role.permissions.forEach(permission => {
        const permKey: PermissionKey = `${permission.resource}:${permission.action}`;
        this.permissionCache.add(permKey);
      });
    });
  }

  // check if the user has specific permission
  hasPermission(permissionKey: PermissionKey): boolean {
    return this.permissionCache.has(permissionKey);
  }

  // check if the user has N permissions (OR logical)
  hasAnyPermission(permissions: PermissionKey[]): boolean {
    return permissions.some(perm => this.hasPermission(perm));
  }

  // check if the user has ALL specificed permission (AND logical)
  hasAllPermissions(permissions: PermissionKey[]): boolean {
    return permissions.every(perm => this.hasPermission(perm));
  }

  // check if the user has specific role
  hasRole(roleName: string): boolean {
    return this.roleCache.has(roleName);
  }

  // check if the user has one of the roles 
  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  // get all user permissions
  getAllPermissions(): PermissionKey[] {
    return Array.from(this.permissionCache);
  }

  // Clear cache
  clearPermissions(): void {
    this.permissionCache.clear();
    this.roleCache.clear();
    this.currentUser = null;
  }
}