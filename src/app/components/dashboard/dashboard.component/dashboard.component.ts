import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth.servcies/auth.servcies';

@Component({
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  user: any = null;

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef, // ✅ ADD
  ) {}

  ngOnInit(): void {
    this.loadUser();
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

  logout() {
    this.auth.logout();
    location.href = '/';
  }
}
