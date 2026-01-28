import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secondary-btn',
  imports: [
    MaterialModule,
    CommonModule,
  ],  
  templateUrl: './secondary-btn.component.html',
  styleUrl: './secondary-btn.component.css',
})
export class BtnSecondary {
  @Input() icon?: string; 
  @Input() label?: string;
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'secondary';
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() class: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  get componentClasses(): string[] {
    return [
      `btn-${this.variant}`,
      `${this.class}`,
      this.isLoading ? 'btn-loading' : ''
    ];
  }

  onClick(): void {
    if (!this.isDisabled && !this.isLoading) {
      this.buttonClick.emit();
    }
  }
}
