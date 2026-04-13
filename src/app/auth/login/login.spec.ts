import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login], // ✅ standalone
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email field', () => {
    const email = component.loginForm.get('email');

    email?.setValue('wrong-email');
    expect(email?.valid).toBeFalsy();

    email?.setValue('test@gmail.com');
    expect(email?.valid).toBeTruthy();
  });

  it('should require password', () => {
    const password = component.loginForm.get('password');

    password?.setValue('');
    expect(password?.valid).toBeFalsy();

    password?.setValue('12345678');
    expect(password?.valid).toBeTruthy();
  });
});
