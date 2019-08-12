import { Component, OnInit } from '@angular/core';

import { HelpersService, CacheService } from '../../imports';
import { AuthRequestService } from '../../services/auth-request.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authRequestService: AuthRequestService,
    private helpersService: HelpersService,
    private cacheService: CacheService
  ) { }

  ngOnInit() {

    const rq1 = this.authRequestService.logout().subscribe(response => {
      localStorage.removeItem('token');
      this.helpersService.navigate(['login']);
      this.cacheService.clear();
      rq1.unsubscribe();
    })
  }

}
