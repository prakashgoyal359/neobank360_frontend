import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

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

  selectedUser: any = null;

  generatedUsername = '';

  tempPassword = '';

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {

    this.loadUsers();
  }

  // ✅ LOAD USERS
  loadUsers() {

    this.auth.getUsers()
      .subscribe((res: any) => {

        this.users = res;

        this.cdr.detectChanges();
      });
  }

  // ✅ DELETE USER
  delete(id: number) {

    if (!confirm('Delete user?')) {
      return;
    }

    this.auth.deleteUser(id)
      .subscribe(() => {

        this.loadUsers();
      });
  }

  // ✅ EDIT
  startEdit(user: any) {

    this.editUser = { ...user };

    this.cdr.detectChanges();
  }

  // ✅ SAVE EDIT
  saveEdit() {

    this.auth.updateUser(
      this.editUser.id,
      this.editUser
    ).subscribe(() => {

      alert('User updated ✅');

      this.editUser = null;

      this.loadUsers();
    });
  }

  // ✅ VIEW DETAILS
  viewDetails(user: any) {

    this.selectedUser = user;

    this.generateUsername(user.firstName);

    this.cdr.detectChanges();
  }

  // ✅ GENERATE USERNAME
  generateUsername(firstName: string) {

    const random =
      Math.floor(
        1000 + Math.random() * 9000
      );

    this.generatedUsername =
      firstName.toLowerCase() + random;
  }

  // ✅ APPROVE
  approve(id: number) {

    if (!this.tempPassword) {

      alert('Enter temporary password ❌');

      return;
    }

    const payload = {

      username: this.generatedUsername,

      password: this.tempPassword,
    };

    this.auth.approveUser(id, payload)
      .subscribe((res: any) => {

        alert(
          `Account Approved ✅

Username: ${this.generatedUsername}

Temporary Password: ${this.tempPassword}`
        );

        this.selectedUser = null;

        this.tempPassword = '';

        this.loadUsers();
      });
  }

  // ✅ REJECT
  reject(id: number) {

    if (!confirm('Reject account?')) {
      return;
    }

    this.auth.rejectUser(id)
      .subscribe(() => {

        alert('Account rejected ❌');

        this.loadUsers();
      });
  }

  // ✅ LOGOUT
  logout() {

    localStorage.clear();

    location.href = '/';
  }
}