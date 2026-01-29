import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(
  minLength = 8
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

     const errors: ValidationErrors = {};
     
     
   if (value.length < minLength) {
      errors['minLength'] = {
         requiredLength: minLength,
         actualLength: value.length,
      };
   }

   if (!/[A-Z]/.test(value)) {
      errors['uppercase'] = true;
   }

   if (!/[a-z]/.test(value)) {
      errors['lowercase'] = true;
   }

   if (!/[0-9]/.test(value)) {
      errors['number'] = true;
   }

   if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors['specialChar'] = true;
   }

    return Object.keys(errors).length ? errors : null;
  };
}
