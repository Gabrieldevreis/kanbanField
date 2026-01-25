import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { KanbanComponent } from './kanban.component';
import { ModalEditTasksComponent } from '../../shared/components/modal-edit-tasks/modal-edit-tasks.component';
import { KanbanRoutingModule } from './kanban-routing.module';

@NgModule({
  declarations: [
    KanbanComponent,
    ModalEditTasksComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    KanbanComponent
  ]
})
export class KanbanModule { }
