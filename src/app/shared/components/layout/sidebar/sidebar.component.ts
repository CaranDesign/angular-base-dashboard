import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarPrimaryNavComponent } from './sidebar-primary-nav/sidebar-primary-nav.component';
import { BtnPrimary } from '../../common/buttons/primary-button/primary-btn.component';
import { MaterialModule } from '../../../material/material/material.module';
import { SidebarService } from '../../../../core/services/layout.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarPrimaryNavComponent,
    BtnPrimary,
    MaterialModule,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  
  @Input() user: User | null = null;
  @Output() logout = new EventEmitter<void>();

  
  constructor(private sidebarService: SidebarService) {}
  
  onToggleClick(): void {
    this.sidebarService.toggleSidebar();
  }

  onLogout(): void {
    this.logout.emit();
  }
}
