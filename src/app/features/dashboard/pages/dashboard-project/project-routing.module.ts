import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProjectTimelineComponent } from './views/project-timeline/project-timeline.component';
import { ProjectBoardComponent } from './views/project-board/project-board.component';
import { ProejctLayoutComponent } from './project-layout.component';

// Define all sub-routes of /project/id/
// Such as /board /timeline etc...
const routes: Routes = [
  {
    path: ':id',
    component: ProejctLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full'
      },
      {
        path: 'board',
        component: ProjectBoardComponent
      },
      {
        path: 'timeline',
        component: ProjectTimelineComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
