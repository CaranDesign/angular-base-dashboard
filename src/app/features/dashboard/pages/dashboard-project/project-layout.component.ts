import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ProjectViewsTypeBarComponent } from './components/project-views-type-bar/project-views-type-bar.component';
import { ProjectTitleBarComponent } from './components/project-title-bar/project-title-bar.component';
import { ProjectToolbarComponent } from './components/project-toolbar/project-toolbar.component';
import { MaterialModule } from '../../../../shared/material/material.module';

@Component({
  selector: 'app-project-layout',
  imports: [
    ProjectViewsTypeBarComponent,
    ProjectTitleBarComponent,
    ProjectToolbarComponent,
    MaterialModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './project-layout.component.html',
  styleUrl: './project-layout.component.css',
})
export class ProejctLayoutComponent {

  projectId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    //catch params from url
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectId = params.get('id') || '';
    });
  }
}
