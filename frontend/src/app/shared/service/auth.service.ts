import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginDto } from '../models/login.dto';
import { RegisterDto } from '../models/register.dto';
import { AuthResponse } from '../models/auth-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8001/auth'; // ajuste para seu backend

  constructor(private http: HttpClient) {}

  login(data: LoginDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, data)
      .pipe(catchError(this.handleError));
  }

  register(data: RegisterDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Erro inesperado';

    if (error.status === 0) {
      message = 'Erro de conexão com o servidor';
    }

    if (error.status === 400) {
      message = error.error?.message || 'Dados inválidos';
    }

    if (error.status === 401) {
      message = 'Email ou senha inválidos';
    }

    if (error.status === 403) {
      message = 'Acesso não autorizado';
    }

    return throwError(() => new Error(message));
  }
}
