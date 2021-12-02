import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from '../../shared/account.model';
import { AccountService } from '../../shared/account.service';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  goBackIcon = faAngleDoubleLeft;
  editable: boolean = false;

  account: Account;
  username: string = ''
  password: string = '';
  cfpassword: string = '';
  email: string = '';
  name: string = '';
  phone: string = '';
  updateErr: string;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.account = this.accountService.getAccount(localStorage.getItem('currentAccount'))
    this.username = this.account.username;
    this.email = this.account.email;
    this.name = this.account.name;
    this.phone = this.account.phone;
  }

  onUpdate() {
    if (this.password == '') {
      this.updateErr = "The password field can't be left empty"
    } else if (this.password !== this.cfpassword) {
      this.updateErr = "The password confirmation is not match!"
    } else {
      this.account.password = this.password
      this.account.name = this.name
      this.account.email = this.email
      this.account.phone = this.phone
      alert("Successfully updated your admin's profile! Redirecting to Admin's Panel!")
      this.router.navigate(['/admin'])
    }
  }

  onTriggerEdit() {
    this.editable = true;
  }

  onClose(){
    this.editable = false;
    this.updateErr = undefined;
  }

  onGoBack(){
    if (this.editable) {
      if (confirm("Are you sure want to discard all changes and go back to Admin Panel?")) {
        this.router.navigate(['/admin'])
      }
    } else {
      this.router.navigate(['/admin'])
    }
  }

}
