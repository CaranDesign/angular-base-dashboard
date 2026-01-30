import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = new BehaviorSubject<'light' | 'dark'>('light');
  public currentTheme$: Observable<'light' | 'dark'> = this.currentTheme.asObservable();

  constructor() {
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme.next(theme);

    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    localStorage.setItem('theme', theme);
  }

  toggleTheme(): void {
    const current = this.currentTheme.value;
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }
}