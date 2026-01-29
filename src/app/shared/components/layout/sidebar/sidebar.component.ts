import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarProjectsNavComponent } from './sidebar-projects-nav/sidebar-projects-nav.component';
import { SidebarPrimaryNavComponent } from './sidebar-primary-nav/sidebar-primary-nav.component';
import { BtnSecondary } from '../../common/buttons/secondary-button/secondary-btn.component';
import { BtnPrimary } from '../../common/buttons/primary-button/primary-btn.component';
import { BtnText } from '../../common/buttons/text-button/text-btn.component';
import { BtnIcon } from '../../common/buttons/icon-button/icon-btn.component';
import { SidebarService } from '../../../../core/services/layout.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MaterialModule } from '../../../material/material.module';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarPrimaryNavComponent,
    SidebarProjectsNavComponent,
    MaterialModule,
    CommonModule,
    BtnPrimary,
    BtnSecondary,
    BtnText,
    BtnIcon
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  
  @Input() user: User | null = null;
  @Output() logout = new EventEmitter<void>();

  
  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) { }
  
  onToggleClick(): void {
    this.sidebarService.toggleSidebar();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
