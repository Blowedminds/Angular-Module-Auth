import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {MainRequestService, RoutingListService} from '../imports';

@Injectable()
export class AuthRequestService extends MainRequestService {

  constructor(
    http: HttpClient,
    routingListService: RoutingListService
  ) {
    super(http, routingListService);
  }

  checkAuthenticated(): Observable<any> {
    return this.makeGetRequest('auth.is-authenticated');
  }

  signUp(data: any): Observable<any> {
    return this.makePostRequest('auth.sign_up', data);
  }

  login(data: any): Observable<any> {
    return this.makePostRequest('auth.login', data);
  }

  logout(): Observable<any> {
    return this.makeGetRequest('auth.logout');
  }
}
