import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Directives
import { HasPermissionDirective } from './directives/has-permission.directive';

// Components
import { SidebarPrimaryNavComponent } from './components/layout/sidebar/sidebar-primary-nav/sidebar-primary-nav.component';
import { BtnSecondary } from './components/common/buttons/secondary-button/secondary-btn.component';
import { BtnPrimary } from './components/common/buttons/primary-button/primary-btn.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { InputFieldComponent } from './components/forms/input-field/input-field.component';
import { BtnMedium } from './components/common/buttons/medium-button/medium-btn.component';
import { BtnSmall } from './components/common/buttons/small-button/small-btn.component';
import { BtnIcon } from './components/common/buttons/icon-button/icon-btn.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { MaterialModule } from './material/material.module';


// Pipes

const IMPORTS = [
  ReactiveFormsModule,
  MaterialModule,
  CommonModule,
  FormsModule,

  // Components
  SidebarPrimaryNavComponent,
  InputFieldComponent,
  MainLayoutComponent,
  SidebarComponent,
  BtnSecondary,
  BtnPrimary,
  BtnMedium,
  BtnSmall,
  BtnIcon,

  // Directives
  HasPermissionDirective,
  
  // Pipes
  /* SafeHtmlPipe */
];

@NgModule({
  imports: [IMPORTS],
  exports: [IMPORTS] // export all for feature modules
})
export class SharedModule {}