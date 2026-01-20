import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';

@NgModule({
  declarations: [
    ConfigurationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ConfigurationsComponent
  ]
})
export class ConfigurationsModule { }
