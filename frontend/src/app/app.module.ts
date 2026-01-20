import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Feature Modules
import { AuthModule } from './features/auth/auth.module';
import { BoardsModule } from './features/boards/boards.module';
import { KanbanModule } from './features/kanban/kanban.module';
import { HomeModule } from './features/home/home.module';
import { CalendarModule } from './features/calendar/calendar.module';
import { ConfigurationsModule } from './features/configurations/configurations.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    BoardsModule,
    KanbanModule,
    HomeModule,
    CalendarModule,
    ConfigurationsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
