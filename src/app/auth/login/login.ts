import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
})
export class Login {
  loginForm: FormGroup;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // DarkMode Toggle
  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);

        // ✅ Decode JWT
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        const role = payload.role;

        console.log('Role:', role);

        // ✅ Redirect based on role
        if (role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/customer-dashboard']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      },
    });
  }
}
