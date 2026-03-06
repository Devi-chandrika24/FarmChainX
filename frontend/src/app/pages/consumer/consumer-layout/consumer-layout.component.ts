import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConsumerSidebarComponent } from '../consumer-sidebar/consumer-sidebar.component';
import { AuthService } from '../../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-consumer-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, LucideAngularModule, ConsumerSidebarComponent],
  templateUrl: './consumer-layout.component.html',
})
export class ConsumerLayoutComponent {
  sidebarOpen = false;
  private themeService = inject(ThemeService);

  constructor(private auth: AuthService) { }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  currentConsumerName(): string {
    const n = (this.auth?.getName && this.auth.getName()) || 'User';
    return n ? String(n).split(' ')[0] : 'User';
  }
}
