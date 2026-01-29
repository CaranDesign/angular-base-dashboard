import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BtnPrimary } from '../../common/buttons/primary-button/primary-btn.component';
import { BtnIcon } from '../../common/buttons/icon-button/icon-btn.component';
import { SidebarService } from '../../../../core/services/layout.service';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MaterialModule } from '../../../material/material.module';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  imports: [
    ThemeToggleComponent,
    UserMenuComponent,
    MaterialModule,
    CommonModule,
    BtnPrimary,
    BtnIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  
  constructor(
    private sidebarService: SidebarService
  ) { }
  
  
  onToggleClick(): void {
    this.sidebarService.toggleSidebar();
  }
}
