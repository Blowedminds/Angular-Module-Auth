import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

import {catchError, tap} from 'rxjs/operators';

import {HelpersService, MainComponent} from '../../imports';
import {AuthRequestService} from '../../services/auth-request.service';
import {locale} from '../../locale';
import {ErrorStateMatcher} from '@angular/material/core';
import {errors} from '../../errors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent extends MainComponent implements OnInit {

  locale: any = locale;

  error = {
    error: false,
    text: ''
  };

  signUpFormGroup: FormGroup;

  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.])[A-Za-z\d@$!%*?&\.]{8,}$/;

  passwordMismatchMatcher = new PasswordMismatchMatcher();

  isProcessing = false;

  constructor(
    private authRequestService: AuthRequestService,
    private helpersService: HelpersService,
    private formBuilder: FormBuilder
  ) {
    super();

    this.signUpFormGroup = formBuilder.group({
      name: formBuilder.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: formBuilder.control('', [
        Validators.required,
        Validators.email
      ]),
      password: formBuilder.control('', [
        Validators.required,
        Validators.pattern(this.passwordRegex)
      ]),
      password_confirm: formBuilder.control('', [
        Validators.required,
      ])
    }, {validators: passwordValidator});
  }

  ngOnInit() {
  }

  signUp(data: any) {
    this.isProcessing = true;
    this.error.error = false;

    data = {
      name: data.name,
      email: data.email,
      password: data.password
    };

    this.subs.add(
      this.authRequestService.signUp(data)
        .pipe(
          tap(response => this.helpersService.navigate(['/login'])),
          catchError(error => this.signUpErrorHandler(error))
        )
        .subscribe(response => {
        })
    );
  }

  private signUpErrorHandler(error: any): Promise<any> {
    const requestError = error.error;

    this.isProcessing = false;

    switch (error.status) {
      case 422:
        this.error.error = true;
        if (requestError.message_code in errors) {
          this.error.text = locale.errors[errors[requestError.message_code].locale_key];
        }
        break;
    }

    return Promise.reject(error);
  }
}

export class PasswordMismatchMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted)) || form.form.errors?.password_mismatch;
  }
}

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('password_confirm');

  return password.value !== passwordConfirm.value ? {password_mismatch: true} : null;
};
