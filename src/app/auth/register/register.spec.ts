import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('Register Component', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register], // ✅ standalone component
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create register component', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form initially', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component.registerForm;

    form.setValue({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    expect(form.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    const emailControl = component.registerForm.get('email');
    emailControl?.setValue('invalid-email');

    expect(emailControl?.valid).toBeFalsy();
  });
});
