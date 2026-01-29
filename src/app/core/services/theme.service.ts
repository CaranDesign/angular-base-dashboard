import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = new BehaviorSubject<'light' | 'dark'>('light');
  public currentTheme$: Observable<'light' | 'dark'> = this.currentTheme.asObservable();

  constructor() {
    // Carica il tema salvato dal localStorage
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme.next(theme);

    // Applica/rimuovi la classe .dark-theme al documento
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }

    // Salva la preferenza nel localStorage
    localStorage.setItem('theme', theme);
  }

  toggleTheme(): void {
    const current = this.currentTheme.value;
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.currentTheme.value;
  }
}