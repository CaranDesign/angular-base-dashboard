import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // check if there's token user for logged in users
    const token = this.authService.getToken();
    
    if (!token) {
      // if not redirect user to login
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}