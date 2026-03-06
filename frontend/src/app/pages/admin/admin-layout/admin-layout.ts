import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from '../components/admin-sidebar/admin-sidebar';
import { AuthService } from '../../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminSidebar, TranslateModule, LucideAngularModule],
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  // Sidebar toggle state
  sidebarOpen = false;
  private themeService = inject(ThemeService);

  constructor(private authService: AuthService) { }

  /**
   * Toggles the state of the mobile sidebar.
   */
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /**
   * Retrieves and formats the current admin's first name.
   */
  currentAdminName(): string {
    const name = this.authService.getName();
    return name ? name.split(' ')[0] : 'Admin';
  }
}
