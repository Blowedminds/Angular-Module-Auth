import { TestBed, inject, async } from '@angular/core/testing';

import { AuthRequestService } from './auth-request.service';
import { TestingHelper } from '../imports';
import { catchError } from 'rxjs/operators';
import { CoreModule } from '../imports';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthRequestService', () => {
  let requestService: AuthRequestService;

  const testingHelper = new TestingHelper();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRequestService],
      imports: [
        CoreModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(testingHelper.routes)
      ]
    });

    requestService = TestBed.get(AuthRequestService);
  });

  it('should be created', inject([AuthRequestService], (service: AuthRequestService) => {
    expect(service).toBeTruthy();
  }));

  it('should have correct route for checkAuthenticated', async(() => {
    requestService.checkAuthenticated()
      .subscribe(response => expect(response.authenticated).toBeFalsy());
  }));

  it('should have correct route for login', async(() => {
    requestService.login({})
      .pipe(catchError(error => testingHelper.invalidDataError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for logout', async(() => {
    requestService.logout()
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));
});
