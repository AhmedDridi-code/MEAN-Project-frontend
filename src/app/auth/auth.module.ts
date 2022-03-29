import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from '../app-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
