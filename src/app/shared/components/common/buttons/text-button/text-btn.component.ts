import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MaterialModule } from '../../../../material/material.module';
import { ButtonStyle } from '../../../../../core/models/layout.model';

@Component({
  selector: 'app-text-btn',
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './text-btn.component.html',
  styleUrl: './text-btn.component.css',
})
export class BtnText {
 @Input() icon?: string; 
  @Input() label?: string;
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'secondary';
  @Input() btnStyle: ButtonStyle = 'text';
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
