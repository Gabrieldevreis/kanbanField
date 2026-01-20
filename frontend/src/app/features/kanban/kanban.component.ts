import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnsService, Column, Task } from '../../core/services/columns.service';
import { TasksService } from '../../core/services/tasks.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent implements OnInit {
  showTaskModal = false;
  showColumnModal = false;
  isModalOpen = false;
  selectedTask: Task | null = null;
  selectedColumnId: string | null = null;
  projectId: string = '';
  isLoading = false;
  errorMessage: string | null = null;
  
  // Formulário de nova tarefa
  newTask: Partial<Task> = {
    title: '',
    description: '',
    priority: 'medium',
    tag: '',
    footer: '',
  };

  columns: Column[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private columnsService: ColumnsService,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      if (this.projectId) {
        this.loadColumns();
      }
    });
  }

  loadColumns(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.columnsService.getAll(this.projectId).subscribe({
      next: (columns) => {
        // Garantir que tasks sempre seja um array
        this.columns = columns.map(col => ({
          ...col,
          tasks: col.tasks || []
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  openTaskModal(columnId: string) {
    this.selectedColumnId = columnId;
    this.newTask = {
      title: '',
      description: '',
      priority: 'medium',
      tag: '',
      footer: '',
    };
    this.showTaskModal = true;
  }

  closeTaskModal() {
    this.showTaskModal = false;
    this.selectedColumnId = null;
    this.newTask = {
      title: '',
      description: '',
      priority: 'medium',
      tag: '',
      footer: '',
    };
  }

   openColumnModal() {
    this.showColumnModal = true;
  }

  closeColumnModal() {
    this.showColumnModal = false;
  }

  createColumn(name: string, emoji?: string) {
    const title = `${emoji ? emoji + ' ' : ''}${name}`;
    this.isLoading = true;
    this.columnsService.create(this.projectId, { title }).subscribe({
      next: (column) => {
        this.columns.push({ ...column, tasks: column.tasks || [] });
        this.isLoading = false;
        this.closeColumnModal();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  openEditTaskModal(task: Task, columnId: string) {
    this.selectedTask = { ...task };
    this.selectedColumnId = columnId;
    this.isModalOpen = true;
  }

  closeEditTaskModal() {
    this.isModalOpen = false;
    this.selectedTask = null;
    this.selectedColumnId = null;
  }

  saveTask(updatedTask: Task) {
    if (!this.selectedTask?.id || !this.selectedColumnId) return;

    this.isLoading = true;
    this.tasksService.update(this.selectedColumnId, this.selectedTask.id, updatedTask).subscribe({
      next: () => {
        this.loadColumns();
        this.closeEditTaskModal();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  deleteTask() {
    if (!this.selectedTask?.id || !this.selectedColumnId) return;

    this.isLoading = true;
    this.tasksService.delete(this.selectedColumnId, this.selectedTask.id).subscribe({
      next: () => {
        this.loadColumns();
        this.closeEditTaskModal();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  createTask(task: Partial<Task>) {
    if (!this.selectedColumnId) return;

    this.isLoading = true;
    this.tasksService.create(this.selectedColumnId, task).subscribe({
      next: () => {
        this.loadColumns();
        this.closeTaskModal();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }
}
