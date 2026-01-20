import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');

    let authRequest = request;

    if (token) {
      console.log('Token encontrado, adicionando ao header Authorization');
      authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Header Authorization adicionado:', authRequest.headers.get('Authorization') ? 'Sim' : 'Não');
    } else {
      console.warn('Token não encontrado no localStorage para a requisição:', request.url);
    }

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se receber 401, o token pode estar expirado ou inválido
        if (error.status === 401) {
          // Remover token inválido
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          
          // Redirecionar para login apenas se não estiver já na página de login/register
          if (!this.router.url.includes('/login') && !this.router.url.includes('/register')) {
            this.router.navigate(['/login'], {
              queryParams: { sessionExpired: 'true' }
            });
          }
        }
        return throwError(() => error);
      })
    );
  }
}
