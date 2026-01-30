import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';

import { MaterialModule } from '../../../../../../shared/material/material.module'; 

@Component({
  selector: 'app-project-board',
  imports: [MaterialModule, CommonModule, AsyncPipe],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.css',
})
export class ProjectBoardComponent {

  projectId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    //catch id of project from parent route
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      console.log('Project ID:', this.projectId);
    });
  }
}
