// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admindashboard/admindashboard.component/admindashboard.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
];
