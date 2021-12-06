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

  //xem them ben service
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
    this.selectedUser = acc;
  }

  getIsDisable(isDisable: boolean) {
    this.isDisable = isDisable;
  }

  getClear(isClearSelectedUser: boolean){
    if(isClearSelectedUser){
      this.selectedUser = undefined;
    }
  }
}
