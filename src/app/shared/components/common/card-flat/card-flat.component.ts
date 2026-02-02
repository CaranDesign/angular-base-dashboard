import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-card-flat',
  imports: [MaterialModule, CommonModule],
  templateUrl: './card-flat.component.html',
  styleUrl: './card-flat.component.css',
})
export class CardFlatComponent {
  @Input() class: string = '';

  get componentClasses(): string[] {
    return [
      `db-card db-card-flat ${this.class}`
    ];
  }
}
