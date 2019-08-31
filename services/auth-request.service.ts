import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HelpersService, MainRequestService, RoutingListService } from '../imports';

@Injectable()
export class AuthRequestService extends MainRequestService {

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  ) {
    super(http, helpersService, routingListService);
  }

  checkAuthenticated(): Observable<any> {
    return this.makeGetRequest('auth.is-authenticated');
  }

  register(data: any): Observable<any> {
    return this.makePostRequest('auth.register', data);
  }

  login(data: any): Observable<any> {
    return this.makePostRequest('auth.login', data);
  }

  logout(): Observable<any> {
    return this.makeGetRequest('auth.logout');
  }
}
