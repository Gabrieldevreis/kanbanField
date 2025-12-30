import { Component } from '@angular/core';

interface Task {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  tag?: string;
  footer: string;
}

interface Column {
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})


export class KanbanComponent {
  showTaskModal = false;
  showColumnModal = false;
  isModalOpen = false;
  selectedTask: any = null;

  columns: Column[] = [
    {
      title: 'A Fazer',
      tasks: [
        {
          title: 'Revisar documentação',
          description: 'Atualizar a documentação do projeto',
          priority: 'high',
          tag: 'docs',
          footer: 'Hoje',
        },
        {
          title: 'Design da landing page',
          description: 'Criar mockups da nova landing page',
          priority: 'medium',
          tag: 'design',
          footer: 'Amanhã',
        },
        {
          title: 'Pesquisa de mercado',
          description: 'Analisar concorrentes',
          priority: 'low',
          tag: 'research',
          footer: 'Próx. semana',
        },
      ],
    },
    {
      title: 'Em Progresso',
      tasks: [
        {
          title: 'Implementar autenticação',
          description: 'Adicionar sistema de login e registro',
          priority: 'high',
          tag: 'backend',
          footer: 'Em andamento',
        },
        {
          title: 'Testes de usabilidade',
          description: 'Realizar testes com usuários reais',
          priority: 'medium',
          tag: 'ux',
          footer: 'Esta semana',
        },
      ],
    },
    {
      title: 'Em Revisão',
      tasks: [
        {
          title: 'API de pagamentos',
          description: 'Integração com gateway de pagamento',
          priority: 'medium',
          tag: 'backend',
          footer: 'Aguardando',
        },
      ],
    },
    {
      title: 'Concluído',
      tasks: [
        {
          title: 'Setup do projeto',
          description: 'Configuração inicial do repositório',
          priority: 'low',
          tag: 'setup',
          footer: '✓ Completo',
        },
        {
          title: 'Definir paleta de cores',
          description: 'Escolher cores do brand',
          priority: 'low',
          tag: 'design',
          footer: '✓ Completo',
        },
      ],
    },
  ];

  openTaskModal() {
    this.showTaskModal = true;
  }

  closeTaskModal() {
    this.showTaskModal = false;
  }

   openColumnModal() {
    this.showColumnModal = true;
  }

  closeColumnModal() {
    this.showColumnModal = false;
  }

  createColumn(name: string, emoji?: string) {
    this.columns.push({
      title: `${emoji ? emoji + ' ' : ''}${name}`,
      tasks: [],
    });

    this.closeColumnModal();
  }

  openEditTaskModal(task: any) {
    this.selectedTask = { ...task };
    this.isModalOpen = true;
  }

  closeEditTaskModal() {
  this.isModalOpen = false;
  this.selectedTask = null;
}

saveTask(updatedTask: any) {
  console.log('Salvar:', updatedTask);
  this.isModalOpen = false;
}

deleteTask() {
  console.log('Excluir task');
  this.isModalOpen = false;
}
}
