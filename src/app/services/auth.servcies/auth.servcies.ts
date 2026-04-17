// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // ✅ SEND OTP
  sendOtp(aadhar: string): Observable<any> {
    return this.http.post(`${this.api}/otp/send?aadhar=${aadhar}`, {});
  }

  // ✅ VERIFY OTP
  verifyOtp(aadhar: string, otp: number): Observable<any> {
    return this.http.post(`${this.api}/otp/verify?aadhar=${aadhar}&otp=${otp}`, {});
  }

  // ✅ REGISTER
  register(data: any): Observable<any> {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  // ✅ LOGIN
  login(data: any): Observable<any> {
    return this.http.post(`${this.api}/auth/login`, data);
  }

  // ✅ EXTRACT ROLE FROM TOKEN
  getRole(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }

  // ✅ LOGOUT
  logout() {
    localStorage.removeItem('token');
  }
}
