import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {HelpersService, RoutingListService} from '../../imports';
import {AuthRequestService} from '../../services/auth-request.service';

import {locale} from '../../locale';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

  error = false;

  errorText = locale.errors.wrong_username_or_password;

  logining = false;

  subs = new Subscription();

  constructor(
    private requestService: AuthRequestService,
    private helpersService: HelpersService,
    private routingListService: RoutingListService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  login(f: NgForm) {
    this.error = false;
    this.logining = true;

    this.subs.add(
      this.requestService.login({
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
