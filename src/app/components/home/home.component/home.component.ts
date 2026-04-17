// src/app/components/home/home.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from '../../register/register.component/register.component';
import { LoginComponent } from '../../login/login.component/login.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent, LoginComponent, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  showRegister = false;
  showLogin = false;

  openRegister() {
    this.showRegister = true;
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
    this.showRegister = false;
  }

  closeAll() {
    this.showRegister = false;
    this.showLogin = false;
  }
}
