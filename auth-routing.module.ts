import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LogoutComponent} from './components/logout/logout.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', /* canActivate: [GuestRouteGuard],*/ component: LoginComponent},
  {path: 'sign-up', /* canActivate: [GuestRouteGuard],*/ component: SignUpComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {enableTracing: false}
    )],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
