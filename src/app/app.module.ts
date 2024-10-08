import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      ForgotPasswordComponent,
      NotFoundComponent
    ],
    imports: [
      BrowserModule,
      CommonModule,
      AppRoutingModule,
      FontAwesomeModule,
      ReactiveFormsModule,
      FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
  })
  export class AppModule {}