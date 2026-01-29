import { Component } from '@angular/core';
import { HasPermissionDirective } from '../../../../directives/has-permission.directive';
import { MaterialModule } from '../../../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BtnText } from '../../../common/buttons/text-button/text-btn.component';
import { MenuItem } from '../../../../../core/models/layout.model';
import { BtnMedium } from '../../../common/buttons/medium-button/medium-btn.component';

@Component({
  selector: 'app-sidebar-projects-nav',
  standalone:true,
  imports: [
    HasPermissionDirective,
    MaterialModule,
    CommonModule,
    RouterModule,
    BtnMedium,
    BtnText,
  ],
  templateUrl: './sidebar-projects-nav.component.html',
  styleUrl: './sidebar-projects-nav.component.css',
})
export class SidebarProjectsNavComponent {

    menuItems: MenuItem[] = [
      { label: 'Reporting', route: '#', icon: 'show_chart' },
      { label: 'Portfolios', route: '#', icon: 'folder' },
      { label: 'Goals', route: '#', icon: 'flag',}
    ];
  
}
