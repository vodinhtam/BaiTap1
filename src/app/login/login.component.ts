import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  username: string;
  password: string;
  loginErr: string;

  constructor(private accountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
        username: [null, Validators.required],
        password: [null, Validators.required]
    })
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
