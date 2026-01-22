// shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { InputFieldComponent } from './components/forms/input-field/input-field.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { ButtonComponent } from './components/common/button/button.component';

// Directives
import { HasPermissionDirective } from './directives/has-permission.directive';

// Pipes

const DECLARATIONS = [
  // Components
  ButtonComponent,
  InputFieldComponent,
  MainLayoutComponent,
  SidebarComponent,
  
  // Directives
  HasPermissionDirective,
  
  // Pipes
  /* SafeHtmlPipe */
];

const IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [IMPORTS],
  exports: [DECLARATIONS, IMPORTS] // export all for feature modules
})
export class SharedModule {}