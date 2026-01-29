import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../../material/material.module';
import { ButtonStyle } from '../../../../../core/models/layout.model';

@Component({
  selector: 'app-primary-btn',
  imports: [
    MaterialModule,
    CommonModule,
  ],
  templateUrl: `./primary-btn.component.html`,
  styleUrls: ['./primary-btn.component.scss']
})
export class BtnPrimary {
  
  @Input() icon?: string; 
  @Input() label?: string;
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() btnStyle: ButtonStyle = 'filled';
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