import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import feather from 'feather-icons';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Verificar se veio do registro
    const registered = this.route.snapshot.queryParams['registered'];
    const email = this.route.snapshot.queryParams['email'];
    const sessionExpired = this.route.snapshot.queryParams['sessionExpired'];
    
    if (registered === 'true') {
      this.successMessage = 'Conta criada com sucesso! Faça login para continuar.';
      if (email) {
        this.form.patchValue({ email });
      }
    }
    
    if (sessionExpired === 'true') {
      this.errorMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
    }
  }

  ngAfterViewInit() {
    feather.replace();
    // Atualizar ícones quando mensagens aparecerem
    if (this.successMessage) {
      setTimeout(() => feather.replace(), 100);
    }
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
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log('Usuário:', response.user);

      // Redirecionar para a URL que tentou acessar ou para /boards
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/boards';
      this.router.navigate([returnUrl]);
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
