import { Router, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { MaterialModule } from '../../../material/material/material.module';
import { AuthService } from '../../../../core/services/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-main-layout',
  imports: [
    SidebarComponent,
    HeaderComponent,
    MaterialModule, 
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  currentUser$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}