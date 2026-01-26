import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HasPermissionDirective } from '../../../directives/has-permission.directive';
import { PermissionKey } from '../../../../core/models/permission.model';
import { User } from '../../../../core/models/user.model';
import { PermissionService } from '../../../../core/services/permission.service';
import { MaterialModule } from '../../../material/material/material.module';
import { ButtonComponent } from '../../common/button/button.component';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  requiredPermission?: PermissionKey[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    HasPermissionDirective,
    ButtonComponent,
    MaterialModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() user: User | null = null;
  @Output() logout = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard/home', icon: 'dashboard' },
    { label: 'Profile', route: '/profile', icon: 'person' },
    { label: 'Admin', route: '/admin/users', icon: 'settings', requiredPermission: ['users:read'] }
  ];

  constructor(private permissionService: PermissionService) {}

  onLogout(): void {
    this.logout.emit();
  }
}
