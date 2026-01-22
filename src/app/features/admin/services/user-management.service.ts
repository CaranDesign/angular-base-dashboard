// features/admin/services/user-management.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../../core/models/user.model';

export interface UserListResponse {
  data: User[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private apiUrl = '/api/admin/users';

  constructor(private http: HttpClient) {}

  getUsers(
    page: number,
    pageSize: number,
    filters?: any
  ): Observable<UserListResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (filters?.search) {
      params = params.set('search', filters.search);
    }
    if (filters?.role) {
      params = params.set('role', filters.role);
    }

    return this.http.get<UserListResponse>(this.apiUrl, { params });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData);
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignRole(userId: string, roleId: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/roles`, { roleId });
  }

  removeRole(userId: string, roleId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}/roles/${roleId}`);
  }
}