import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { ConfigurationsComponent } from './features/configurations/configurations.component';
import { BoardsComponent } from './features/boards/boards.component';
import { KanbanComponent } from './features/kanban/kanban.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/boards',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'configurations',
        component: ConfigurationsComponent
      },
      {
        path: 'boards',
        component: BoardsComponent
      },
      {
        path: 'kanban/:projectId',
        component: KanbanComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/boards'
  }
]
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
