import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonStyle } from '../../../../../core/models/layout.model';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-icon-btn',
  imports: [CommonModule, MaterialModule],
  templateUrl: './icon-btn.component.html',
  styleUrl: './icon-btn.component.css',
})
export class BtnIcon {
  @Input() icon?: string; 
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'secondary';
  @Input() btnStyle: ButtonStyle = 'filled';
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() class: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  
  get componentClasses(): string[] {
    return [
      `db-icon-btn btn-${this.variant}`,
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
