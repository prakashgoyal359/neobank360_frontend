import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.servcies/auth.servcies';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  @Output() close = new EventEmitter();

  verified = false;
  form!: FormGroup;

  passwordStrength = '';
  strengthColor = 'bg-red-500';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      panNumber: ['', Validators.required],
      aadharNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      accountType: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=(.*[@$!%*?&]){2,}).{8,}$'),
        ],
      ],
      confirmPassword: ['', Validators.required],
      otp: ['', Validators.required],
    });
  }

  // 🔥 PASSWORD STRENGTH CHECK
  checkStrength() {
    const value = this.form.value.password || '';

    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if ((value.match(/[@$!%*?&]/g) || []).length >= 2) strength++;

    if (strength <= 2) {
      this.passwordStrength = 'Weak';
      this.strengthColor = 'bg-red-500';
    } else if (strength <= 4) {
      this.passwordStrength = 'Medium';
      this.strengthColor = 'bg-orange-500';
    } else {
      this.passwordStrength = 'Strong';
      this.strengthColor = 'bg-green-500';
    }
  }

  // 🔥 CHECK PASSWORD MATCH
  passwordMatch(): boolean {
    return this.form.value.password === this.form.value.confirmPassword;
  }

  // ✅ SEND OTP
  getOtp() {
    this.auth.sendOtp(this.form.value.aadharNumber!).subscribe((res: any) => {
      alert(res.message);

      console.log('OTP from backend:', res.otp); // ✅ frontend console
    });
  }

  // ✅ VERIFY OTP
  verifyOtp() {
    const otp = this.form.value.otp;

    this.auth.verifyOtp(this.form.value.aadharNumber!, Number(otp)).subscribe((res: any) => {
      alert(res.message);

      if (res.message === 'Verified') {
        this.verified = true;
      }
    });
  }

  // ✅ REGISTER
  submit() {
    if (!this.verified) {
      alert('Verify Aadhaar ❌');
      return;
    }

    if (!this.passwordMatch()) {
      alert('Passwords do not match ❌');
      return;
    }
    if (this.form.invalid) {
      alert('Fill all fields correctly ❌');
      return;
    }

    const data = {
      ...this.form.value,
      mobileNumber: '+91' + this.form.value.mobileNumber,
    };

    this.auth.register(data).subscribe((res: any) => {
      alert(res.message);

      // ✅ SHOW GENERATED DATA
      console.log('Username:', res.username);
      console.log('Account Number:', res.accountNumber);

      alert(`Account Created ✅\nUsername: ${res.username}\nAccount: ${res.accountNumber}`);

      this.close.emit();
    });
  }
}
