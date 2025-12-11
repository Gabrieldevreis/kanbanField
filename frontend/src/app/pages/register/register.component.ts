import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import feather from 'feather-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  passwordStrength = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ]
    });

    feather.replace();
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    console.log('Form enviado:', this.signupForm.value);
  }

  updatePasswordStrength() {
    const value = this.signupForm.get('password')?.value || '';
    let strength = 0;

    if (value.length >= 8) strength += 33;
    if (/[A-Z]/.test(value)) strength += 33;
    if (/\d/.test(value)) strength += 34;

    this.passwordStrength = strength;
  }
}
