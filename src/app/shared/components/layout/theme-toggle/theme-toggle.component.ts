import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {
  currentTheme$: Observable<'light' | 'dark'>;

  constructor(private themeService: ThemeService) {
    this.currentTheme$ = this.themeService.currentTheme$;
  }

  ngOnInit(): void {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}