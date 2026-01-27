import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { SidebarPrimaryNavComponent } from './components/layout/sidebar/sidebar-primary-nav/sidebar-primary-nav.component';
import { BtnPrimary } from './components/common/buttons/primary-button/primary-btn.component';
import { InputFieldComponent } from './components/forms/input-field/input-field.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { MaterialModule } from './material/material/material.module';

// Directives
import { HasPermissionDirective } from './directives/has-permission.directive';

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
  BtnPrimary,
  
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