import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('neobank360_frontend');

  constructor(private router: Router) {}

  showNavbar(): boolean {
    const hiddenRoutes = ['/login', '/']; // register + login
    return !hiddenRoutes.includes(this.router.url);
  }
}
