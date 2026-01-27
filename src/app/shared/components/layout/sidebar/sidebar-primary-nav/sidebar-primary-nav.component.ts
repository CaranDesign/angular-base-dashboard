import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BtnPrimary } from '../../../common/buttons/primary-button/primary-btn.component';
import { HasPermissionDirective } from '../../../../directives/has-permission.directive';
import { PermissionService } from '../../../../../core/services/permission.service';
import { MaterialModule } from '../../../../material/material/material.module';
import { PermissionKey } from '../../../../../core/models/permission.model';



interface MenuItem {
  label: string;
  route: string;
  icon: string;
  requiredPermission?: PermissionKey[];
}

@Component({
  selector: 'app-sidebar-primary-nav',
  standalone:true,
  imports: [
    HasPermissionDirective,
    MaterialModule,
    CommonModule,
    RouterModule,
    BtnPrimary,
  ],
  templateUrl: './sidebar-primary-nav.component.html',
  styleUrl: './sidebar-primary-nav.component.css',
})
export class SidebarPrimaryNavComponent {

    constructor(private permissionService: PermissionService){}
  
    menuItems: MenuItem[] = [
      { label: 'Dashboard', route: '/dashboard/home', icon: 'dashboard' },
      { label: 'Profile', route: '/profile', icon: 'person' },
      { label: 'Admin', route: '/admin/users', icon: 'settings', requiredPermission: ['users:read'] }
    ];
  

}
