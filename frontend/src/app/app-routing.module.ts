
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { ConfigurationsComponent } from './shared/components/configurations/configurations.component';
import { BoardsComponent } from './shared/components/boards/boards.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'calendar',
        component:CalendarComponent
      },
      {
        path:'configurations',
        component:ConfigurationsComponent
      },
      {
        path:'boards',
        component:BoardsComponent
      }
    ]
  }
]
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
