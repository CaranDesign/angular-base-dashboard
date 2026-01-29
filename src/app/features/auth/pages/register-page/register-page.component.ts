import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BtnPrimary } from '../../../../shared/components/common/buttons/primary-button/primary-btn.component';
import { InputFieldComponent } from '../../../../shared/components/forms/input-field/input-field.component';
import { strongPasswordValidator } from '../../../../core/validators/strong-password.validator';
import { passwordMatchValidator } from '../../../../core/validators/match-password.validator';
import { ValidationConstants } from '../../../../core/constants/validations.constants';
import { PermissionService } from '../../../../core/services/permission.service';
import { MaterialModule } from '../../../../shared/material/material.module';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    MaterialModule,
    RouterModule,
    CommonModule,
    BtnPrimary,
  ],
  standalone:true,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
 form!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("Login Page init")
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, strongPasswordValidator(8)]],
      confirmPassword: ['',[Validators.required]],
    },
    { validators: passwordMatchValidator }
    );
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading = true;
    
    this.authService.login(this.form.value).subscribe({
      next: (user) => {
        // upload permissions
        this.permissionService.loadPermissions(user);
        // Redirect to dashboard
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration failed:', error);
        // handling error here and show alert 
      }
    });
  }

  getErrorMessage(field: string): string | null {
    const control = this.form.get(field);
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    const errors = control.errors;

    // Built-in validators
    if (errors['required']) return `${field} is required`;
    if (errors['email']) return ValidationConstants.WRONG_EMAIL;
    if (errors['minlength']) {
      const err = control.getError('minlength');
      return `Password must be at least ${err.requiredLength} characters`;
    }

    // Strong password validator
    if (errors['uppercase']) return ValidationConstants.PASSWORD_UPPERCASE;
    if (errors['lowercase']) return ValidationConstants.PASSWORD_ONE_LOWERCASE;
    if (errors['number']) return ValidationConstants.PASSWORD_ONE_NUMBER;
    if (errors['specialChar']) return ValidationConstants.PASSWORD_ONE_SPECIAL;

    // Password match validator (form-level error)
    if (field === 'confirmPassword' && this.form.hasError('passwordMismatch')) {
      return ValidationConstants.PASSWORD_DO_NOT_MATCH;
    }

    return null;
  }

}
