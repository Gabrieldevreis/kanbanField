import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Project } from '../../shared/interfaces/projects.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly API_URL = 'http://localhost:8001/projects';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  getById(id: string): Observable<Project> {
    return this.http
      .get<Project>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(project: Partial<Project>): Observable<Project> {
    return this.http
      .post<Project>(this.API_URL, project)
      .pipe(catchError(this.handleError));
  }

  update(id: string, project: Partial<Project>): Observable<Project> {
    return this.http
      .patch<Project>(`${this.API_URL}/${id}`, project)
      .pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Erro inesperado';

    if (error.status === 0) {
      message = 'Erro de conexão com o servidor';
    } else if (error.status === 400) {
      message = error.error?.message || 'Dados inválidos';
    } else if (error.status === 401) {
      message = 'Não autorizado';
    } else if (error.status === 403) {
      message = 'Acesso não autorizado';
    } else if (error.status === 404) {
      message = 'Recurso não encontrado';
    }

    return throwError(() => new Error(message));
  }
}
