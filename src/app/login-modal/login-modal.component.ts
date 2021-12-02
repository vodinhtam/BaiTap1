import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
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
