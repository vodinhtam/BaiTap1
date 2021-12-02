import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../shared/account.model';
import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {
  account: Account;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.account = this.accountService.getAccount(localStorage.getItem('currentAccount'))
  }

  onLogOut(){
    localStorage.removeItem('currentAccount')
    this.router.navigate(['/index'])
  }

}
