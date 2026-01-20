import { Component, OnInit } from '@angular/core';
import { Project, ProjectStatus } from '../../shared/interfaces/projects.interface';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ProjectsService } from '../../core/services/projects.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
})
export class BoardsComponent implements OnInit {
  activeFilter: 'all' | ProjectStatus = 'all';
  isLoading = false;
  errorMessage: string | null = null;

  projects: Project[] = [];

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Verificar autenticação ao carregar
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/boards' }
      });
      return;
    }
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.projectsService.getAll().subscribe({
      next: (projects) => {
        // Mapear os projetos do backend para o formato esperado pelo frontend
        this.projects = projects.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description || '',
          icon: p.icon,
          tasks: p.tasks || 0,
          progress: p.progress || 0,
          members: Array.isArray(p.members) ? p.members : [],
          color: p.color,
          status: p.status as ProjectStatus,
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  get filteredProjects() {
    if (this.activeFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter((p) => p.status === this.activeFilter);
  }

  filterProjects(filter: 'all' | ProjectStatus) {
    this.activeFilter = filter;
  }

  showDashboard(project: Project) {
    if (project.id) {
      this.router.navigate([`/kanban/${project.id}`]);
    }
  }

  isCreateBoardModalOpen = false;

  openProjectModal(): void {
    this.isCreateBoardModalOpen = true;
  }

  closeProjectModal(): void {
    this.isCreateBoardModalOpen = false;
    this.errorMessage = null;
  }

  onCreateBoard(project: Project): void {
    console.log('Criando board:', project);
    
    if (!project.title || !project.title.trim()) {
      this.errorMessage = 'O nome do board é obrigatório.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    
    const projectData = {
      title: project.title.trim(),
      description: project.description || '',
      icon: project.icon || 'fa-briefcase',
      color: project.color || '#667eea',
      status: project.status || 'active',
    };

    console.log('Dados enviados para o backend:', projectData);

    this.projectsService.create(projectData).subscribe({
      next: (createdProject: any) => {
        console.log('Board criado com sucesso:', createdProject);
        
        // Mapear members corretamente
        let membersArray: string[] = [];
        if (Array.isArray(createdProject.members)) {
          membersArray = createdProject.members.map((m: any) => {
            if (typeof m === 'string') {
              return m;
            }
            if (m && m.user && m.user.name) {
              const name = m.user.name;
              const parts = name.split(' ');
              if (parts.length >= 2) {
                return (parts[0][0] + parts[1][0]).toUpperCase();
              }
              return name.substring(0, 2).toUpperCase();
            }
            return '';
          }).filter((m: string) => m !== '');
        }
        
        const mappedProject: Project = {
          id: createdProject.id,
          title: createdProject.title,
          description: createdProject.description || '',
          icon: createdProject.icon,
          tasks: createdProject.tasks || 0,
          progress: createdProject.progress || 0,
          members: membersArray,
          color: createdProject.color,
          status: createdProject.status as ProjectStatus,
        };
        
        this.projects = [mappedProject, ...this.projects];
        this.isLoading = false;
        this.closeProjectModal();
      },
      error: (err) => {
        console.error('Erro ao criar board:', err);
        console.error('Status do erro:', err.status);
        console.error('Mensagem do erro:', err.message);
        
        if (err.status === 401) {
          this.errorMessage = 'Sua sessão expirou. Redirecionando para login...';
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          setTimeout(() => {
            this.router.navigate(['/login'], {
              queryParams: { returnUrl: '/boards', sessionExpired: 'true' }
            });
          }, 2000);
        } else {
          this.errorMessage = err.message || 'Erro ao criar board. Tente novamente.';
        }
        this.isLoading = false;
      }
    });
  }
}
