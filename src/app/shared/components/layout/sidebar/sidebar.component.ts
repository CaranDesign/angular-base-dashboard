// shared/components/layout/sidebar/sidebar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../core/services/user.service';
import { PermissionService } from '../../../../core/services/permission.service';
interface MenuItem {
  label: string;
  route: string;
  icon: string;
  requiredPermission?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  template: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() user: User | null = null;
  @Output() logout = new EventEmitter<void>();

  // Items of the primary navigation menus
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard/home',
      icon: '📊'
    },
    {
      label: 'Profile',
      route: '/profile',
      icon: '👤'
    },
    {
      label: 'Admin',
      route: '/admin/users',
      icon: '⚙️',
      requiredPermission: 'users:read'
    }
  ];

  constructor(private permissionService: PermissionService) {}

  onLogout(): void {
    this.logout.emit();
  }
}