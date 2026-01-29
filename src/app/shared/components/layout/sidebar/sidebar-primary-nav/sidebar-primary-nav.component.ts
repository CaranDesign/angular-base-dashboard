import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HasPermissionDirective } from '../../../../directives/has-permission.directive';
import { PermissionService } from '../../../../../core/services/permission.service';
import { BtnText } from '../../../common/buttons/text-button/text-btn.component';
import { MaterialModule } from '../../../../material/material.module';
import { MenuItem } from '../../../../../core/models/layout.model';
import { BtnMedium } from '../../../common/buttons/medium-button/medium-btn.component';



@Component({
  selector: 'app-sidebar-primary-nav',
  standalone:true,
  imports: [
    HasPermissionDirective,
    MaterialModule,
    CommonModule,
    RouterModule,
    BtnText,
    BtnMedium,
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
