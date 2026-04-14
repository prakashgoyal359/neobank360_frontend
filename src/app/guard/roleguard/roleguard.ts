import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const RoleGuard = (expectedRole: string) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const role = payload.role;

  if (role !== expectedRole) {
    router.navigate(['/dashboard']); // fallback
    return false;
  }

  return true;
};
