import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {locale} from '../../locale';
import {AuthRequestService} from '../../services/auth-request.service';
import {NgForm} from '@angular/forms';
import {catchError, tap} from 'rxjs/operators';
import {MainComponent} from '../../imports';
import {errors} from '../../errors';

@Component({
  selector: 'app-login-body',
  templateUrl: './login-body.component.html',
  styleUrls: ['./login-body.component.scss']
})
export class LoginBodyComponent extends MainComponent implements OnInit {

  locale = locale;

  error = {
    error: false,
    text: ''
  };

  @Output() loggedIn = new EventEmitter();

  get isPageReady(): boolean {
    return true;
  }

  constructor(
    private requestService: AuthRequestService
  ) {
    super();
  }

  ngOnInit() {
  }

  login(f: NgForm) {
    this.error.error = false;
    this.enterProcessingState();

    this.subs.add(
      this.requestService.login({
        email: f.value.email,
        password: f.value.password
      })
        .pipe(
          tap(response => {
            // Store the token in localStorage
            localStorage.setItem('token', response.token);
            return response;
          }),
          catchError(error => this.loginErrorHandler(error))
        )
        .subscribe((response) => this.loggedIn.emit())
    );
  }

  private loginErrorHandler(error: any): Promise<any> {
    const requestError = error.error;

    this.leaveProcessingState();

    switch (error.status) {
      case 422:
        this.error.error = true;
        if (requestError.message in errors) {
          this.error.text = locale.errors[errors[requestError.message].locale_key];
        }
        break;
    }

    return Promise.reject(error);
  }

}
