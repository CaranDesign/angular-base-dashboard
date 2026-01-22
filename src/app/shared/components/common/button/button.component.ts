// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: `./button.component.html`,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  
  @Input() label: string = 'Click me';
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