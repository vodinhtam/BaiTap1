import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { Account } from '../../shared/account.model';
import { faUserEdit, faEye, faUserTimes, faUserCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  account: Account;

  selectedUser: Account;
  isDisable: boolean;

  editIcon = faUserEdit;
  viewIcon = faEye;
  delIcon = faUserTimes;
  adminIcon = faUserCog;

  constructor(private accService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.account = this.accService.getAccount(localStorage.getItem('currentAccount'));
  }

  onLogOut() {
    localStorage.removeItem('currentAccount');
    this.router.navigate(['/index'])
  }

  onUpdateProfile() {
    this.router.navigate(['/admin-edit'])
  }

  getSelectedUser(acc: Account) {
    // use the object in array? No
    // this.selectedUser = acc;

    //copy object instead
    this.selectedUser = new Account(acc.username, acc.password, acc.isAdmin, acc.name, acc.email, acc.phone)

    //save the username in localStorage
    localStorage.setItem("selectedUser", acc.username)
  }

  getIsDisable(isDisable: boolean) {
    this.isDisable = isDisable;
  }

  getClear(isFormClear: boolean){
    if(isFormClear){
      this.selectedUser = undefined;
    }
  }
}
