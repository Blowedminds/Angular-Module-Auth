import {Component, OnInit} from '@angular/core';
import {MainComponent, RequestFailService, RetryRequest} from '../../imports';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent extends MainComponent implements OnInit {

  retryRequest: Array<RetryRequest> = [];

  constructor(
    private requestFailService: RequestFailService,
    private router: Router
  ) {
    super();
    this.subs.add(this.requestFailService.failedRequests.subscribe(request => this.retryRequest.push(request)));
  }

  ngOnInit(): void {
  }

  onLoggedIn() {
    for (const req of this.retryRequest) {
      this.requestFailService.retryFailedRequests.next(req);
    }

    this.router.navigate([{outlets: {auth: null}}]);
  }
}
