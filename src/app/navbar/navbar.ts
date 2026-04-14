import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  role: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.role = payload.role;
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
