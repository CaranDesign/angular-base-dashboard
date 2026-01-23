import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PermissionGuard } from './core/guards/permission.guard';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { AccessDeniedComponent } from './features/dashboard/pages/access-denied/access-denied.component';
import { NotFoundComponent } from './features/dashboard/pages/not-found/not-found.component';
import { MainLayoutComponent } from './shared/components/layout/main-layout/main-layout.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginPageComponent },
  { path: 'auth/register', component: RegisterPageComponent },
  
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      },
      {
        path: 'admin',
        canActivate: [PermissionGuard],
        data: { permissions: ['admin:access'] },
        loadChildren: () =>
          import('./features/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/user-profile/user-profile.module')
            .then(m => m.UserProfileModule)
      },
      {
        path: '',
        redirectTo: 'dashboard/home',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', component: NotFoundComponent }
];
