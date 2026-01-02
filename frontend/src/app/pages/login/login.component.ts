import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import feather from 'feather-icons';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngAfterViewInit() {
    feather.replace();
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
  this.errorMessage = null;

  this.authService.login(this.form.value).subscribe({
    next: (response) => {
      localStorage.setItem('token', response.access_token);
      console.log('Usuário:', response.user);

      // Redirecionar após login
      this.router.navigate(['/boards']);
    },
    error: (err) => {
      this.errorMessage = err.message;
      this.isLoading = false;
    },
    complete: () => {
      this.isLoading = false;
    }
  });
  }
}
