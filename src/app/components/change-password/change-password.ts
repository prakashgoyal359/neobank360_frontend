import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.servcies/auth.servcies';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.html',
})
export class ChangePasswordComponent {
  newPassword = '';
  username = '';
  oldPassword = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    const token = localStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.username = payload.sub || payload.username;
    }
  }

  changePassword() {
    this.auth.changePassword(this.username, this.newPassword, this.oldPassword).subscribe(() => {
      alert('Password updated ✅');
      this.router.navigate(['/dashboard']);
    });
  }
}
