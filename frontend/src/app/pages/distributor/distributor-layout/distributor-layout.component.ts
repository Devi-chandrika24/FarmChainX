import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Translation, TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../../services/theme.service';

@Component({
  standalone: true,
  selector: 'app-distributor-layout',
  imports: [CommonModule, RouterModule, RouterOutlet, TranslateModule, LucideAngularModule],
  templateUrl: './distributor-layout.component.html',
})
export class DistributorLayoutComponent {
  sidebarOpen = false;
  private themeService = inject(ThemeService);

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
