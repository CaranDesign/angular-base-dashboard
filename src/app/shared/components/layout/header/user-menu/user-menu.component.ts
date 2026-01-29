import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BtnMedium } from '../../../common/buttons/medium-button/medium-btn.component';
import { BtnSmall } from '../../../common/buttons/small-button/small-btn.component';
import { HasPermissionDirective } from '../../../../directives/has-permission.directive';
import { BtnPrimary } from '../../../common/buttons/primary-button/primary-btn.component';
import { BtnText } from '../../../common/buttons/text-button/text-btn.component';
import { MaterialModule } from '../../../../material/material.module';
import { MenuItem } from '../../../../../core/models/layout.model';


@Component({
  selector: 'app-user-menu',
  imports: [
    CommonModule,
    MaterialModule,
    BtnText,
    BtnSmall,
    BtnMedium,
    BtnPrimary,
    HasPermissionDirective
  ],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})

export class UserMenuComponent {

  constructor() { }
  
  primaryUserMenu: MenuItem[] = [
    {
      icon: 'settings_input_component',
      label: 'Admin',
      route: '#',
    },
    {
      icon: 'email',
      label: 'Invite to Demo',
      route: '#',
    },
  ]
  
  secondaryUserMenu: MenuItem[] = [
    {
      icon: 'assignment_ind',
      label: 'Profile',
      route: '#',
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: '#',
    },
    {
      icon: 'add',
      label: 'Add another account',
      route: '#',
    },
  ]
  
  
}
