import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './profile.html',
})
export class Profile {
  user: any = {};
  role: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProfile();
    this.decodeToken();
  }

  loadProfile() {
    this.http.get('http://localhost:8080/api/users/me').subscribe((res) => (this.user = res));
  }

  decodeToken() {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    this.role = payload.role;
  }
}
