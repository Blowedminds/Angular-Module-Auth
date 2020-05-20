import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LogoutComponent} from './components/logout/logout.component';
import {LoginPopupComponent} from './components/login-popup/login-popup.component';

const routes: Routes = [
  {path: 'auth/login', /* canActivate: [GuestRouteGuard],*/ component: LoginComponent},
  {path: 'auth/sign-up', /* canActivate: [GuestRouteGuard],*/ component: SignUpComponent},
  {path: 'auth/logout', component: LogoutComponent},
  {path: 'popup', component: LoginPopupComponent, outlet: 'auth'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
