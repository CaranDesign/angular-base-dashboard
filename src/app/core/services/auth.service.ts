import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';

import { User, UserLoginRequest, UserLoginResponse } from '../models/user.model';
import { MOCK_LOGIN_RESPONSE } from '../../mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // BehaviorSubject provides a stream of authentication state changes to user
  private currentUserSubject$ = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  
  public currentUser$ = this.currentUserSubject$.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor(private http: HttpClient) {
    this.initializeAuth();
  }

  // Initialize auth state and check if token is valid
  private initializeAuth(): void {
    const token = this.getToken();
    if (token) {
      // PUT HERE THE LOGIC FOR TOKEN VALIDATION
      this.isAuthenticatedSubject$.next(true);
    }
  }

  // Login: send credential, get token e user
  login(credentials: UserLoginRequest): Observable<User> {
    console.log('[MOCK LOGIN]', credentials);

    return of(MOCK_LOGIN_RESPONSE).pipe(
      tap((response: UserLoginResponse) => {
        // esattamente come la versione reale
        this.setToken(response.token);
        this.setRefreshToken(response.refreshToken);

        this.currentUserSubject$.next(response.user);
        this.isAuthenticatedSubject$.next(true);
      }),
      map(response => response.user)
    );
  }
  
  // Register
  register(userData: any): Observable<User> {
    return this.http.post<UserLoginResponse>('/api/auth/register', userData)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken);
          this.currentUserSubject$.next(response.user);
          this.isAuthenticatedSubject$.next(true);
        }),
        map(response => response.user)
      );
  }

  // Logout: remove token and user
  logout(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.currentUserSubject$.next(null);
    this.isAuthenticatedSubject$.next(false);
  }

  // Getter for obtain current user (synchronously)
  getCurrentUser(): User | null {
    return this.currentUserSubject$.value;
  }

  // Getter for token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Save token
  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Remove token
  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Refresh token logic
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  private removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  // Helper for check if user is logged in or not
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject$.value;
  }
}