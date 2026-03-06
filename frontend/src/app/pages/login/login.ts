import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) { }

  login() {
    this.errorMessage = '';
    this.loading = true;
    this.http.post<any>(`${environment.apiUrl}/auth/login`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.auth.setAuthFromResponse(res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
        } else {
          this.errorMessage = err?.error?.error || 'Invalid email or password. Please try again.';
        }
      }
    });
  }
}
