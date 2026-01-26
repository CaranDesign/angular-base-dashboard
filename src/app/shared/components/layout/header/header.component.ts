import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MaterialModule } from '../../../material/material/material.module';
import { SidebarService } from '../../../../core/services/layout.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  
  constructor(private sidebarService: SidebarService){}
  
  
  onToggleClick(): void {
    this.sidebarService.toggleSidebar();
  }
}
