import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogoutComponent } from './components/logout/logout.component';

import { AuthRequestService } from './services/auth-request.service';
import { AuthService } from './services/auth.service';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { LoginBodyComponent } from './components/login-body/login-body.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    CoreModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
    LogoutComponent,
    LoginPopupComponent,
    LoginBodyComponent
  ],
  providers: [
    AuthRequestService,
    AuthService
  ]
})
export class AuthModule { }
