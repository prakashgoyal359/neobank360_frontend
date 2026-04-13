import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer_dashboard.html',
})
export class Customer_Dashboard {
  userName = 'Prakash';
  balance = 27000.3;

  transactions = [
    { name: 'Netflix', date: '12 Mar 2024', amount: -100 },
    { name: 'PayPal', date: '08 Mar 2024', amount: 1000 },
    { name: 'Apple', date: '06 Mar 2024', amount: -100 },
  ];

  toggleTheme() {
    document.documentElement.classList.toggle('dark');
  }
}
