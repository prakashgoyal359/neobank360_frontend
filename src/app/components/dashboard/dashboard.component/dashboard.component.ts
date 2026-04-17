// dashboard.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.servcies/auth.servcies';

@Component({
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
    location.href = '/';
  }
}
