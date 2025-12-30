import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-edit-tasks',
  templateUrl: './modal-edit-tasks.component.html',
  styleUrl: './modal-edit-tasks.component.scss'
})
export class ModalEditTasksComponent {
  @Input() isOpen = false;
  @Input() task: any = {
    title: '',
    description: '',
    tag: '',
    date: '',
    color: '',
  };

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  saveTask() {
    this.save.emit(this.task);
  }

  deleteTask() {
    this.delete.emit();
  }

  selectColor(color: string) {
    this.task.color = color;
  }
}
