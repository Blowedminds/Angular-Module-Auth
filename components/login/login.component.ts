import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../imports';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private helperService: HelperService
  ) {
  }

  ngOnInit(): void  {
  }


  onLoggedIn() {
    this.helperService.router.navigate(['/']);
  }
}
