import { NgModule } from '@angular/core';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardAvatar, MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDrawer, MatDrawerContainer, MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatDivider, MatList, MatNavList } from '@angular/material/list';
import { CardComponent } from '../components/common/card/card.component';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Centralized Angular Material imports
 */
const MATERIAL_MODULES = [
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDivider,
  MatDrawerContainer,
  MatDrawer,
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenav,
  MatNavList,
  CardComponent,
  MatCardAvatar,
  MatList,
  MatIcon,
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
