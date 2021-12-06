import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../shared/account.model';
import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  account: Account;
  password: string = '';
  cfpassword: string = '';
  email: string = '';
  name: string = '';
  phone: string = '';
  updateErr: string;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.account = this.accountService.getAccount(localStorage.getItem('currentAccount'))
    this.email = this.account.email;
    this.name = this.account.fullname;
    this.phone = this.account.phone;
  }

  onUpdate(){
    if(this.password !== this.cfpassword) {
      this.updateErr = "The password confirmation is not match!"
    } else {
      this.account.password = this.password
      this.account.fullname = this.name
      this.account.email = this.email
      this.account.phone = this.phone
      alert("Successfully updated user's profile! Redirecting to User's Main Page!") 
      this.router.navigate(['/user'])
    }
  }

}
