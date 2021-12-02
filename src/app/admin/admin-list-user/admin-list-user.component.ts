import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEye, faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';

import { Account } from '../../shared/account.model';
import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'app-admin-list-user',
  templateUrl: './admin-list-user.component.html',
  styleUrls: ['./admin-list-user.component.css']
})
export class AdminListUserComponent implements OnInit {
  users: Account[];

  editIcon = faUserEdit;
  viewIcon = faEye;
  delIcon = faUserTimes;

  @Output() selectedUsername = new EventEmitter<Account>();
  @Output() isDisable = new EventEmitter<boolean>();

  constructor(private accService: AccountService) { }

  ngOnInit(): void {
    this.users = this.accService.getUserList();
  }

  onEditUser(acc: Account){
    this.selectedUsername.emit(acc);
    this.isDisable.emit(false);
  }

  onViewUser(acc: Account){
    this.selectedUsername.emit(acc);
    this.isDisable.emit(true);
  }

  onDeleteUser(acc: Account){
    if (confirm("Are you sure to delete this user?")) {
      this.accService.removeAccount(acc);
      //update list
      this.users = this.accService.getUserList();
    }
  }

}
