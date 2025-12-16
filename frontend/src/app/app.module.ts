import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SiderbarComponent } from './shared/components/siderbar/siderbar.component';
import { BoardsComponent } from './shared/components/boards/boards.component';
import { ConfigurationsComponent } from './shared/components/configurations/configurations.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { HeaderComponent } from './shared/components/header/header.component'
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,   
    LoginComponent,
    RegisterComponent,
    SiderbarComponent,
    BoardsComponent,
    ConfigurationsComponent,
    FooterComponent,
    CalendarComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
