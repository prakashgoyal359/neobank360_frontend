import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.servcies/auth.servcies';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './settings.html',
})
export class SettingsComponent implements OnInit {
  user: any = {};

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  passwordStrength = '';
  strengthColor = 'bg-red-500';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe({
      next: (res: any) => {
        this.user = res;
      },
    });
  }

  // 🔥 PASSWORD STRENGTH
  checkStrength() {
    const value = this.newPassword;

    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if (/[@$!%*?&]/.test(value)) strength++;

    if (strength <= 2) {
      this.passwordStrength = 'Weak';
      this.strengthColor = 'bg-red-500';
    } else if (strength <= 4) {
      this.passwordStrength = 'Medium';
      this.strengthColor = 'bg-orange-500';
    } else {
      this.passwordStrength = 'Strong';
      this.strengthColor = 'bg-green-500';
    }
  }

  // 🔐 CHANGE PASSWORD
  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match ❌');

      return;
    }

    this.auth.changePassword(this.user.username, this.oldPassword, this.newPassword).subscribe({
      next: (res: any) => {
        alert(res.message);

        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },

      error: (err) => {
        alert(err.error.message || 'Error ❌');
      },
    });
  }

  logout() {
    localStorage.clear();

    this.router.navigate(['/']);
  }
}
