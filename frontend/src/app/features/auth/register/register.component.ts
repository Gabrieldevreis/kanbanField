import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import feather from 'feather-icons';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  passwordStrength = 0;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

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

  ngAfterViewInit() {
    feather.replace();
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      // Mostrar mensagens de erro específicas
      if (this.signupForm.get('firstname')?.invalid) {
        this.errorMessage = 'O nome é obrigatório.';
      } else if (this.signupForm.get('email')?.invalid) {
        this.errorMessage = 'Insira um email válido.';
      } else if (this.signupForm.get('password')?.invalid) {
        this.errorMessage = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número.';
      }
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const registerData = {
      name: this.signupForm.value.firstname,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        // Mostrar mensagem de sucesso e redirecionar para login
        this.errorMessage = null;
        this.successMessage = 'Conta criada com sucesso! Redirecionando para login...';
        this.isLoading = false;
        
        // Atualizar ícones do feather
        setTimeout(() => feather.replace(), 100);
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login'], {
            queryParams: { registered: 'true', email: this.signupForm.value.email }
          });
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erro ao criar conta. Tente novamente.';
        this.isLoading = false;
        // Atualizar ícones do feather após renderizar mensagem de erro
        setTimeout(() => feather.replace(), 100);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
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
