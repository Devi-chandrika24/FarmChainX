import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = '';

  // validation flags
  passwordValid = {
    minLength: false,
    uppercase: false,
    number: false,
    specialChar: false,
  };
  passwordsMatch = false;

  submitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) { }

  checkPassword() {
    this.passwordValid.minLength = this.password.length >= 8;
    this.passwordValid.uppercase = /[A-Z]/.test(this.password);
    this.passwordValid.number = /\d/.test(this.password);
    this.passwordValid.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
    this.checkConfirmPassword();
  }

  checkConfirmPassword() {
    this.passwordsMatch = this.password === this.confirmPassword && this.confirmPassword.length > 0;
  }

  isPasswordValid(): boolean {
    return Object.values(this.passwordValid).every(Boolean);
  }

  isEmailValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  isFormValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.isEmailValid() &&
      this.role.trim().length > 0 &&
      this.isPasswordValid() &&
      this.passwordsMatch
    );
  }

  submit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.isFormValid()) {
      this.errorMessage = 'Please fix all validation errors before submitting.';
      return;
    }

    this.submitting = true;

    this.http
      .post(`${environment.apiUrl}/auth/register`, {
        name: this.name.trim(),
        email: this.email.trim(),
        password: this.password,
        role: this.role,
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.successMessage = 'Account created! Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 1800);
        },
        error: (err) => {
          this.submitting = false;
          console.error('REGISTER ERROR →', err);
          if (err.status === 0) {
            this.errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
          } else {
            this.errorMessage = err?.error?.message || 'Registration failed. Please try again.';
          }
        },
      });
  }
}
