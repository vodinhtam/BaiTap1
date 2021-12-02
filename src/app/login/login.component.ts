import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginErr: string;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onLogin(){
    let isExists = this.accountService.checkExists(this.username, this.password);
    
    if (isExists) {
      this.accountService.performLogin(this.username);
    } else {
      this.loginErr = "Fail to login, please check your input!"
    }
    
  }
}
