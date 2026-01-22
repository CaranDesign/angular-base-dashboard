import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // If 401 Unauthorized
        if (error.status === 401) {
          // Token expired, logout
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }

        // If 403 Forbidden (no permission)
        if (error.status === 403) {
          this.router.navigate(['/access-denied']);
        }

        // If 500+ Server error, log and notification to user
        if (error.status >= 500) {
          console.error('Server error:', error);
          // Eventually show snackbar or alert
        }

        return throwError(() => error);
      })
    );
  }
}