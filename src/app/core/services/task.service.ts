import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Task } from '../models/projects.model';

@Injectable({
  providedIn: 'root',
})

export class TaskDrawerService {
  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);

  // Public observable, read-only
  selectedTask$: Observable<Task | null> = this.selectedTaskSubject.asObservable();


  openTask(task: Task) {
    this.selectedTaskSubject.next(task);
  }

  closeTask() {
    this.selectedTaskSubject.next(null);
  }
}
