import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../../material/material/material.module';

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