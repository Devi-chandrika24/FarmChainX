import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'app_theme';
    private isDarkThemeSubject = new BehaviorSubject<boolean>(true);
    public isDarkTheme$ = this.isDarkThemeSubject.asObservable();

    constructor() {
        this.initTheme();
    }

    public initTheme() {
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (savedTheme === 'dark') {
            this.setDarkTheme(true);
        } else if (savedTheme === 'light') {
            this.setDarkTheme(false);
        } else {
            // Default to dark theme
            this.setDarkTheme(true);
        }
    }

    public toggleTheme() {
        const current = this.isDarkThemeSubject.value;
        this.setDarkTheme(!current);
    }

    public setDarkTheme(isDark: boolean) {
        this.isDarkThemeSubject.next(isDark);
        localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');

        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Force repaint for Tailwind dark mode detection
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    }
}
