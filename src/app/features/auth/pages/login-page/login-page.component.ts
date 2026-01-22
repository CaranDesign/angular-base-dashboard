// features/auth/pages/login-page/login-page.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PermissionService } from '../../../../core/services/permission.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading = true;
    
    this.authService.login(this.form.value).subscribe({
      next: (user) => {
        // upload permissions
        this.permissionService.loadPermissions(user);
        // Redirect to dashboard
        this.router.navigate(['/dashboard/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login failed:', error);
        // handling error here and show alert 
      }
    });
  }

  getErrorMessage(field: string): string | null {
    const control = this.form.get(field);
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    if (control.errors['required']) return `${field} is required`;
    if (control.errors['email']) return 'Invalid email format';
    if (control.errors['minlength']) return 'Password must be at least 6 characters';

    return null;
  }
}