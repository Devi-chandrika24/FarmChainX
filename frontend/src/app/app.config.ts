import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { Observable } from 'rxjs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LucideAngularModule, ShieldCheck, MapPin, Truck, Tractor, Store, Smartphone, ArrowRight, Database, CloudCog, Leaf, Globe, ChevronDown, Moon, Sun, Menu, X, LayoutDashboard, QrCode, Package, User, LogOut, PlusCircle, Search, Activity, Banknote, Award, TrendingUp } from 'lucide-angular';

// Custom loader to avoid dependency issues with TranslateHttpLoader
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }
  getTranslation(lang: string): Observable<any> {
    // Assets from 'public' are served at root
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([JwtInterceptor])
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      LucideAngularModule.pick({
        ShieldCheck, MapPin, Truck, Tractor, Store, Smartphone, ArrowRight, Database, CloudCog, Leaf, Globe, ChevronDown, Moon, Sun, Menu, X, LayoutDashboard, QrCode, Package, User, LogOut, PlusCircle, Search, Activity, Banknote, Award, TrendingUp
      })
    )
  ],
};
