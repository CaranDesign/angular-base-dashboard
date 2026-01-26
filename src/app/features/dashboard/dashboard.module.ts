import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { DashboardAnalyticsComponent } from './pages/dashboard-analytics/dashboard-analytics.component';
import { DashboardProfileComponent } from './pages/dashboard-profile/dashboard-profile.component';

 /*  
  * Defining children routes for the main outlet to be rendered with lazy load
  */

const routes: Routes = [
  { path: 'home', component: DashboardHomeComponent },
  { path: 'analytics', component: DashboardAnalyticsComponent },
  { path: 'profile', component: DashboardProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' } // default child
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class DashboardModule { }
