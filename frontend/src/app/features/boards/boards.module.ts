import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoardsComponent } from './boards.component';
import { ModalBoardsComponent } from '../../shared/components/modal-boards/modal-boards.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BoardsComponent,
    ModalBoardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    BoardsComponent
  ]
})
export class BoardsModule { }
