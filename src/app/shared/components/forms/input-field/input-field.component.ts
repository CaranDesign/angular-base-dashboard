import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-input-field',
  imports: [
    CommonModule,
    MaterialModule,
  ],
  templateUrl: `./input-field.component.html`,
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements ControlValueAccessor {
  
  /* 
   * implementation of ControlValueAccessor makes the component 
   * compatible with ReactiveForms  you can use it as following
   * this.form.get('email')?.valueChanges.subscribe(...)
  */

  /*
    * handles the native input event and notifies Angular forms.
    * 
    * - The `onInput` method updates the internal `value` whenever the user types.
    * - It then calls `onChange(value)`, which is the function registered
    *   by Angular's FormControl via ControlValueAccessor.
    * - This ensures the custom input component stays in sync with the
    *   FormControl value and triggers `valueChanges` observers.
  */

  
  @Input() label: string        = '';
  @Input() type: string         = 'text';
  @Input() placeholder: string  = '';
  @Input() class: string        = '';
  @Input() error: string | null = null;
  @Input() isDisabled: boolean  = false;

  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  get componentClasses(): string[] {
    return [
      `${this.class}`
    ]
  }
}