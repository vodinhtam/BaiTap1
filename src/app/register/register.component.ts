import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Account } from '../shared/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';
  cfpassword: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(private accService: AccountService,private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(){
    let acc: Account = this.accService.getAccount(this.username)
    if(acc){
      alert("This account has been taken! Choose another one!")
    } else if(this.password !== this.cfpassword) {
      alert("The password confirmation is not match!")
    } else {
      acc = new Account(this.username, this.password, false, this.name, this.email, this.phone)
      this.accService.addUser(acc);
      alert("Account is successfully registered! Redirecting to Login Page!")

      this.router.navigate(['/login']);
    }
  }

}
