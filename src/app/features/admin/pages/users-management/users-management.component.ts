import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

import { BtnPrimary } from '../../../../shared/components/common/buttons/primary-button/primary-btn.component';
import { createPaginatedListMixin } from '../../../../shared/mixins/paginated-list.mixin';
import { UserManagementService } from '../../services/user-management.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-users-management',
  imports: [
    ReactiveFormsModule,
    BtnPrimary,
    CommonModule,
  ],
  templateUrl:'./users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent
  extends createPaginatedListMixin<User>()
  implements OnInit
{
  searchControl = new FormControl('');

  constructor(private userManagementService: UserManagementService) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    
    // Se l'utente digita, aspetta 300ms e poi carica dati
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.pagination.page = 1;
        this.loadData();
      });
  }

  override loadData(): void {
    this.userManagementService.getUsers(
      this.pagination.page,
      this.pagination.pageSize,
      { search: this.searchControl.value }
    ).subscribe(response => {
      this.items = response.data;
      this.pagination.total = response.total;
    });
  }

  editUser(user: User): void {
    // Open modal/navigate to edit page
    console.log('Edit user:', user);
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.email}?`)) {
      this.userManagementService.deleteUser(user.id).subscribe(() => {
        this.loadData(); // Load list
      });
    }
  }

  openCreateUserModal(): void {
    // Show modal or navigate to create user
    console.log('Open create user modal');
  }
}