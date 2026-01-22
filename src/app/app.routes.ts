import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';

import { AccessDeniedComponent } from './features/dashboard/pages/access-denied/access-denied.component';
import { MainLayoutComponent } from './shared/components/layout/main-layout/main-layout.component';
import { NotFoundComponent } from './features/dashboard/pages/not-found/not-found.component';
import { PermissionGuard } from './core/guards/permission.guard';

const routes: Routes = [
  {
    path: 'auth',
      loadChildren: () =>
       //this loader will upload all the sub routes of authModule in /auth/pages
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
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
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}