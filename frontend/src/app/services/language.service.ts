import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export interface Language {
    code: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private readonly LANG_KEY = 'app_language';

    public readonly availableLanguages: Language[] = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिंदी' },
        { code: 'te', name: 'తెలుగు' },
        { code: 'ta', name: 'தமிழ்' },
        { code: 'kn', name: 'ಕನ್ನಡ' }
    ];

    private currentLanguageSubject = new BehaviorSubject<string>('en');
    public currentLanguage$ = this.currentLanguageSubject.asObservable();

    constructor(private translate: TranslateService) {
        this.translate.addLangs(['en', 'hi', 'te', 'ta', 'kn']);
        this.translate.setDefaultLang('en');
        this.initLanguage();
    }

    private initLanguage() {
        const savedLang = localStorage.getItem(this.LANG_KEY);
        const browserLang = this.translate.getBrowserLang();

        let defaultLang = 'en';
        if (savedLang && this.translate.getLangs().includes(savedLang)) {
            defaultLang = savedLang;
        } else if (browserLang && this.translate.getLangs().includes(browserLang)) {
            defaultLang = browserLang;
        }

        this.setLanguage(defaultLang);
    }

    public setLanguage(langCode: string) {
        this.translate.use(langCode);
        this.currentLanguageSubject.next(langCode);
        localStorage.setItem(this.LANG_KEY, langCode);
    }

    public getCurrentLanguage(): string {
        return this.currentLanguageSubject.value;
    }
}
