import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth.servcies/auth.servcies';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  user: any = null;

  transactions: any[] = [];

  showConfirm = false;

  receiver = '';
  amount = 0;

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef, // ✅ ADD
  ) {}

  openConfirm() {
    if (!this.receiver || !this.amount) {
      alert('Fill all fields ❌');
      return;
    }

    this.showConfirm = true;
  }

  confirmTransfer() {
    this.auth
      .transfer({
        receiverAccount: this.receiver,
        amount: this.amount,
      })
      .subscribe((res: any) => {
        alert(res.message);

        this.showConfirm = false;

        this.cdr.detectChanges();

        this.loadUser(); // refresh balance
        this.loadTransactions(); // refresh list
      });
  }

  cancelTransfer() {
    this.showConfirm = false;
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadTransactions();
  }

  loadUser() {
    this.auth.getUser().subscribe({
      next: (res: any) => {
        console.log('User Data:', res);

        this.user = { ...res }; // ✅ IMPORTANT (new reference)

        this.cdr.detectChanges(); // ✅ FORCE UI UPDATE
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  loadTransactions() {
    this.auth.getTransactions().subscribe((res: any) => {
      this.transactions = res;
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.auth.logout();
    location.href = '/';
  }
}
