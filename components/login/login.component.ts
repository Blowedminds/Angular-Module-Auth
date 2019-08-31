import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { HelpersService, CacheService, RoutingListService } from '../../imports';
import { AuthRequestService } from '../../services/auth-request.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

  error = false;

  errorText = 'Kullanıcı adı veya şifre yanlış';

  logining = false;

  subs = new Subscription();

  constructor(
    private authRequestService: AuthRequestService,
    private helpersService: HelpersService,
    private routingListService: RoutingListService
  ) { }

  ngOnInit() {
    this.subs.add(
      this.authRequestService.checkAuthenticated()
        .subscribe(response => response.authenticated ? this.helpersService.navigate([this.routingListService.getUrl('main')]) : null)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  login(f: NgForm) {
    this.error = false;
    this.logining = true;

    this.subs.add(
      this.authRequestService.login({
        email: f.value.email,
        password: f.value.password
      })
        .pipe(
          map(response => this.helpersService.parseToken(response)),
          tap(response => {

            sessionStorage.setItem('token', response.token);

            return response;
          }),
          catchError(error => this.loginErrorHandler(error))
        )
        .subscribe((response) => this.helpersService.navigate([this.routingListService.getUrl('main')]))
    );
  }

  private loginErrorHandler(error: any): Promise<any> {
    const jsError = error.error;

    this.logining = false;

    switch (error.status) {
      case 401:
        switch (jsError.error) {
          case 'Invalid Credentials':
            this.error = true;
            break;
        }

    }

    return Promise.reject(error);
  }

}
