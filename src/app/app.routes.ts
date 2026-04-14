import { Routes } from '@angular/router';
import { Register } from './auth/register/register'; // adjust path if needed
import { Login } from './auth/login/login';
import { AuthGuard } from './guard/authguard/authguard';
import { Customer_Dashboard } from './customer_dashboard/customer_dashboard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { RoleGuard } from './guard/roleguard/roleguard';

export const routes: Routes = [
  // ✅ Default route (open register page)
  {
    path: '',
    component: Register,
  },

  // ✅ Optional: direct register route
  {
    path: 'register',
    component: Register,
  },

  { path: '', component: Register },
  { path: 'login', component: Login },

  { path: 'customer-dashboard', component: Customer_Dashboard, canActivate: [AuthGuard] },
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [AuthGuard, () => RoleGuard('ADMIN')],
  },
];
