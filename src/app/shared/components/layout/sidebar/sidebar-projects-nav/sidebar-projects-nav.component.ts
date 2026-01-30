import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HasPermissionDirective } from '../../../../directives/has-permission.directive';
import { BtnMedium } from '../../../common/buttons/medium-button/medium-btn.component';
import { BtnText } from '../../../common/buttons/text-button/text-btn.component';
import { BtnIcon } from '../../../common/buttons/icon-button/icon-btn.component';
import { MaterialModule } from '../../../../material/material.module';
import { Project } from '../../../../../core/models/projects.model';
import { MenuItem } from '../../../../../core/models/layout.model';
import { mockProjList } from '../../../../../mock/mock-projects';
import { menuItems } from '../../../../../mock/mock-nav';

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
    BtnIcon,
  ],
  templateUrl: './sidebar-projects-nav.component.html',
  styleUrl: './sidebar-projects-nav.component.css',
})
export class SidebarProjectsNavComponent {

  menuItems: MenuItem[] = menuItems;
  projList: Project[] = mockProjList;
  

}
