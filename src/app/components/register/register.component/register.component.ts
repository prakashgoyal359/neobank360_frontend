import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';

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

  kycDone = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
  ) {
    // 🔥 ONLY KYC VALIDATION INITIALLY
    this.form = this.fb.group({
      // 🔐 KYC STEP
      firstName: ['', Validators.required],

      middleName: [''],

      lastName: ['', Validators.required],

      aadharNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],

      otp: ['', Validators.required],

      // 🧾 ACCOUNT STEP
      gender: [''],

      address: [''],

      email: [''],

      accountType: [''],

      panNumber: [''],

      mobileNumber: [''],

      // 📁 FILES
      aadharFile: [null],

      panFile: [null],

      photoFile: [null],
    });
  }

  // ✅ SEND OTP
  getOtp() {
    const aadhar = this.form.value.aadharNumber;

    if (!aadhar || aadhar.length !== 12) {
      alert('Enter valid Aadhaar ❌');

      return;
    }

    this.auth.sendOtp(aadhar).subscribe((res: any) => {
      alert(res.message);

      console.log('OTP:', res.otp);
    });
  }

  // ✅ VERIFY OTP
  verifyOtp() {
    const aadhar = this.form.value.aadharNumber;

    const otp = this.form.value.otp;

    if (!aadhar || aadhar.length !== 12) {
      alert('Enter valid Aadhaar ❌');

      return;
    }

    if (!otp) {
      alert('Enter OTP ❌');

      return;
    }

    this.auth.verifyOtp(aadhar, Number(otp)).subscribe((res: any) => {
      if (res.message === 'Verified') {
        setTimeout(() => {
          this.verified = true;

          this.kycDone = true;

          // 🔥 REMOVE OTP VALIDATION
          this.form.get('otp')?.clearValidators();

          this.form.get('otp')?.updateValueAndValidity();

          // 🔥 ADD STEP 2 VALIDATORS

          this.form.get('gender')?.setValidators([Validators.required]);

          this.form.get('address')?.setValidators([Validators.required]);

          this.form.get('email')?.setValidators([Validators.required, Validators.email]);

          this.form.get('accountType')?.setValidators([Validators.required]);

          this.form
            .get('panNumber')
            ?.setValidators([Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]);

          this.form
            .get('mobileNumber')
            ?.setValidators([Validators.required, Validators.pattern('^[0-9]{10}$')]);

          this.form.get('aadharFile')?.setValidators([Validators.required]);

          this.form.get('panFile')?.setValidators([Validators.required]);

          this.form.get('photoFile')?.setValidators([Validators.required]);

          // 🔥 UPDATE VALIDITY
          this.form.updateValueAndValidity();

          this.cdr.detectChanges();
        });

        alert('KYC Verified ✅');
      } else {
        alert('Invalid OTP ❌');
      }
    });
  }

  // 📁 FILE UPLOAD
  onFileChange(event: any, field: string) {
    const file = event.target.files[0];

    if (file) {
      this.form.patchValue({
        [field]: file,
      });

      this.form.get(field)?.updateValueAndValidity();

      console.log(field, file);
    }
  }

  // ✅ REGISTER
  submit() {
    // 🔥 DEBUG
    console.log(this.form.value);

    console.log(this.form.status);

    Object.keys(this.form.controls).forEach((key) => {
      const errors = this.form.get(key)?.errors;

      if (errors) {
        console.log(key, errors);
      }
    });

    // ❌ INVALID
    if (this.form.invalid) {
      alert('Fill all fields ❌');

      return;
    }

    // ✅ FORM DATA
    const formData = new FormData();

    const data = {
      firstName: this.form.value.firstName,

      middleName: this.form.value.middleName,

      lastName: this.form.value.lastName,

      email: this.form.value.email,

      gender: this.form.value.gender,

      address: this.form.value.address,

      aadharNumber: this.form.value.aadharNumber,

      panNumber: this.form.value.panNumber,

      mobileNumber: this.form.value.mobileNumber,

      accountType: this.form.value.accountType,
    };

    // 🔥 JSON PART
    formData.append(
      'data',

      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }),
    );

    // 📁 FILES
    formData.append('aadharFile', this.form.value.aadharFile);

    formData.append('panFile', this.form.value.panFile);

    formData.append('photoFile', this.form.value.photoFile);

    // ✅ API CALL
    this.auth.register(formData).subscribe({
      next: (res: any) => {
        alert(res.message);

        this.close.emit();
      },

      error: (err) => {
        console.error(err);

        alert(err.error?.message || 'Registration failed ❌');
      },
    });
  }
}
