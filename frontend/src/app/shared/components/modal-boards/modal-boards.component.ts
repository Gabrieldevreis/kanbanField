import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../interfaces/projects.interface';

@Component({
  selector: 'app-modal-boards',
  templateUrl: './modal-boards.component.html',
  styleUrl: './modal-boards.component.scss',
})
export class ModalBoardsComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<Project>();

  form: FormGroup;

  icons = [
  'fa-briefcase',
  'fa-chart-column',
  'fa-bullseye',
  'fa-rocket',
  'fa-code',
  'fa-mobile-screen',
  'fa-paintbrush',
  'fa-chart-line',
  'fa-gear',
  'fa-trophy',
  'fa-file-lines',
  'fa-screwdriver-wrench',
];



  colors = [
    '#667eea',
    '#f093fb',
    '#4facfe',
    '#43e97b',
    '#fa709a',
    '#feca57',
    '#ff6b6b',
    '#a29bfe',
  ];

  members: string[] = [];

  selectedIcon = 'fa-briefcase';
  selectedColor = '#667eea';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      tasks: [0, [Validators.min(0)]],
      progress: [0, [Validators.min(0), Validators.max(100)]],
      type: ['scrum'],
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  selectIcon(icon: string): void {
    this.selectedIcon = icon;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  addMember(input: HTMLInputElement): void {
    if (input.value.trim()) {
      this.members.push(input.value.toUpperCase());
      input.value = '';
    }
  }

  removeMember(index: number): void {
    this.members.splice(index, 1);
  }

  createBoard(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      // Mostrar erros específicos
      if (this.form.get('name')?.hasError('required')) {
        alert('O nome do board é obrigatório.');
      }
      return;
    }

    if (!this.form.value.name || !this.form.value.name.trim()) {
      alert('O nome do board é obrigatório.');
      return;
    }

    const project: Project = {
      title: this.form.value.name.trim(),
      description: this.form.value.description || '',
      icon: this.selectedIcon,
      tasks: this.form.value.tasks || 0,
      progress: this.form.value.progress || 0,
      members: this.members,
      color: this.selectedColor,

      // regra simples: se não estiver 100%, é ativo
      status: this.form.value.progress === 100 ? 'completed' : 'active'
    };

    this.create.emit(project);
    // Resetar formulário após emitir
    this.resetForm();
  }

  resetForm(): void {
    this.form.reset({
      name: '',
      description: '',
      tasks: 0,
      progress: 0,
      type: 'scrum'
    });
    this.members = [];
    this.selectedIcon = 'fa-briefcase';
    this.selectedColor = '#667eea';
  }
}
