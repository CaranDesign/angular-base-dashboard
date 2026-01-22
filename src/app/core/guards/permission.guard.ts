import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { PermissionService } from '../services/permission.service';
import { PermissionKey } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
  
//CanActivate implementation allow user to access in a specific area 
export class PermissionGuard implements CanActivate {
  constructor(
    private permissionService: PermissionService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    // read the permissions required from the route that will be setted as following example
    /*
    *   {
    *    path: 'admin',
    *    component: AdminComponent,
    *    canActivate: [AuthGuard, PermissionGuard],
    *    data: {
    *      permissions: ['users:read', 'users:update']
    *    }
    *   } 
    */
    
    const requiredPermissions = route.data['permissions'] as PermissionKey[];
    
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // No permission check needed
    }

    // check if user have all the required permissions
    if (this.permissionService.hasAllPermissions(requiredPermissions)) {
      return true;
    }

    // if not redirect user to a landing page
    this.router.navigate(['/access-denied']);
    return false;
  }
}