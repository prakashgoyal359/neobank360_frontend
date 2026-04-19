import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.servcies/auth.servcies';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Output() close = new EventEmitter();

  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  login() {
    this.auth.login({ username: this.username, password: this.password }).subscribe((res: any) => {
      const token = res.token; // ✅ FIXED

      localStorage.setItem('token', token);
      localStorage.setItem('accountType', res.accountType);

      const role = this.auth.getRole(token);

      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/dashboard']);
      }

      this.close.emit();
    });
  }
}
