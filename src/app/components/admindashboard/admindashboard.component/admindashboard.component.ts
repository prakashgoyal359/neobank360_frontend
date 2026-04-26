import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.servcies/auth.servcies';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admindashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  editUser: any = null;

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.cdr.detectChanges();
  }

  loadUsers() {
    this.auth.getUsers().subscribe((res: any) => {
      this.users = res;
      this.cdr.detectChanges();
    });
  }

  delete(id: number) {
    if (!confirm('Delete user?')) return;

    this.auth.deleteUser(id).subscribe(() => {
      this.loadUsers();
      this.cdr.detectChanges();
    });
  }

  startEdit(user: any) {
    this.editUser = { ...user };
    this.cdr.detectChanges();
  }

  saveEdit() {
    this.auth.updateUser(this.editUser.id, this.editUser).subscribe(() => {
      this.editUser = null;
      this.loadUsers();
      this.cdr.detectChanges();
    });
  }

  logout() {
    localStorage.clear();
    location.href = '/';
    this.cdr.detectChanges();
  }
}
