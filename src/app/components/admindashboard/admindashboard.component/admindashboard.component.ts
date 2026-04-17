import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.servcies/auth.servcies';

@Component({
  standalone: true,
  templateUrl: './admindashboard.component.html',
})
export class AdminComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
    location.href = '/';
  }
}
