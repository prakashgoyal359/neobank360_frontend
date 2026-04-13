import { Routes } from '@angular/router';
import { Register } from './auth/register/register'; // adjust path if needed
import { Login } from './auth/login/login';
import { AuthGuard } from './auth/authguard/authguard';
import { Customer_Dashboard } from './customer_dashboard/customer_dashboard';

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

  { path: 'login', component: Login },
  { path: 'dashboard', component: Register, canActivate: [AuthGuard] },
  { path: 'customer_dashboard', component: Customer_Dashboard },
];
