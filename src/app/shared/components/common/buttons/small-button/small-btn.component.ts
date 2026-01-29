import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../../material/material.module';
import { ButtonStyle } from '../../../../../core/models/layout.model';

@Component({
  selector: 'app-small-btn',
  imports: [CommonModule, MaterialModule],
  templateUrl: './small-btn.component.html',
  styleUrl: './small-btn.component.scss',
})
export class BtnSmall {
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
      `db-small-btn btn-${this.variant}`,
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
