import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush, // ✅ PERFORMANCE BOOST
})
export class AdminDashboard {
  users: any[] = [];
  selectedUser: any = null;
  showDropdown = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:8080/api/admin/users').subscribe({
      next: (res) => {
        console.log('Users loaded:', res); // ✅ debug
        this.users = res;
      },
      error: (err) => {
        console.error('Error loading users:', err);

        if (err.status === 403) {
          alert('Access Denied: Admin only');
        }
      },
    });
  }

  // Toggle dropdown
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Select user
  selectUser(user: any) {
    this.selectedUser = { ...user }; // clone
    this.showDropdown = false;
  }

  // Update user
  updateUser() {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .put(`http://localhost:8080/api/admin/users/${this.selectedUser.id}`, this.selectedUser, {
        headers,
      })
      .subscribe(() => {
        alert('User updated successfully');
        this.loadUsers(); // refresh list
      });
  }
}
