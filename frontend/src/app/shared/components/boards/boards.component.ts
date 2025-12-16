import { Component } from '@angular/core';
import { Project, ProjectStatus } from '../../interfaces/projects.interface';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
})
export class BoardsComponent {
  activeFilter: 'all' | ProjectStatus = 'all';

  projects: Project[] = [
    {
      title: 'Sistema de Gestão',
      description:
        'Desenvolvimento de plataforma completa para gestão empresarial',
      icon: '💼',
      tasks: 8,
      progress: 60,
      members: ['JD', 'MS', 'AK', '+2'],
      color: 'color-purple',
      status: 'active',
    },
    {
      title: 'Redesign UI/UX',
      description: 'Renovação completa da interface do aplicativo mobile',
      icon: '🎨',
      tasks: 12,
      progress: 45,
      members: ['LC', 'PM'],
      color: 'color-green',
      status: 'active',
    },
    {
      title: 'Lançamento do Produto',
      description: 'Campanha de marketing e lançamento da versão 2.0',
      icon: '🚀',
      tasks: 15,
      progress: 30,
      members: ['RB', 'TG', 'NK', 'WL'],
      color: 'color-orange',
      status: 'active',
    },
    {
      title: 'App Mobile',
      description: 'Desenvolvimento do aplicativo iOS e Android',
      icon: '📱',
      tasks: 20,
      progress: 75,
      members: ['DF', 'KJ'],
      color: 'color-blue',
      status: 'completed',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Sistema de análise de dados e métricas em tempo real',
      icon: '📊',
      tasks: 10,
      progress: 50,
      members: ['HM', 'SL', 'CN'],
      color: 'color-pink',
      status: 'active',
    },
    {
      title: 'Sistema de Segurança',
      description: 'Implementação de autenticação e criptografia',
      icon: '🔒',
      tasks: 6,
      progress: 90,
      members: ['VT', 'BR'],
      color: 'color-purple',
      status: 'completed',
    },
  ];

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
    console.log('Abrir dashboard do projeto:', project.title);
  }

  isCreateBoardModalOpen = false;

  openProjectModal(): void {
    this.isCreateBoardModalOpen = true;
  }

  closeProjectModal(): void {
    this.isCreateBoardModalOpen = false;
  }

  onCreateBoard(board: any): void {
    console.log('Board criado:', board);
    // aqui você pode dar push na lista ou enviar para API
  }
}
