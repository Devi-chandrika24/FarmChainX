import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LucideAngularModule],
  templateUrl: './home.html'
})
export class Home {
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('fcx_token');
  }

  get isFarmer(): boolean {
    return localStorage.getItem('fcx_role') === 'ROLE_FARMER';
  }
}
