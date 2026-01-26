// button.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';

@Component({
  selector: 'app-button',
  imports: [
    MaterialModule,
    CommonModule,
  ],
  templateUrl: `./button.component.html`,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  
  @Input() icon?: string; 
  @Input() label?: string;
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  get buttonClasses(): string[] {
    return [
      `btn-${this.variant}`,
      this.isLoading ? 'btn-loading' : ''
    ];
  }

  onClick(): void {
    if (!this.isDisabled && !this.isLoading) {
      this.buttonClick.emit();
    }
  }
}