import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { KanbanComponent } from './kanban.component';
import { ModalEditTasksComponent } from '../../shared/components/modal-edit-tasks/modal-edit-tasks.component';

@NgModule({
  declarations: [
    KanbanComponent,
    ModalEditTasksComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    KanbanComponent
  ]
})
export class KanbanModule { }
