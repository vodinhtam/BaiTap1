import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faClone, faEye, faFilter, faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';

import { Account } from '../../shared/account.model';
import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'app-admin-list-user',
  templateUrl: './admin-list-user.component.html',
  styleUrls: ['./admin-list-user.component.css']
})
export class AdminListUserComponent implements OnInit {
  users: Account[];
  pageOfItems: Array<any>;
  selectFilter: string = '--Select Filter--';
  keyFilter: string;
  pageSize: number = 3;

  editIcon = faUserEdit;
  viewIcon = faEye;
  delIcon = faUserTimes;
  filterIcon = faFilter;
  cfilterIcon = faClone;

  @Output() selectedUsername = new EventEmitter<Account>();
  @Output() isDisable = new EventEmitter<boolean>();

  constructor(private accService: AccountService) { }

  ngOnInit(): void {
    this.users = this.accService.getUserList();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    console.log(this.pageOfItems)
  }

  onEditUser(acc: Account) {
    this.selectedUsername.emit(acc);
    this.isDisable.emit(false);
  }

  onViewUser(acc: Account) {
    this.selectedUsername.emit(acc);
    this.isDisable.emit(true);
  }

  onDeleteUser(acc: Account) {
    if (confirm("Are you sure to delete this user?")) {
      this.accService.removeAccount(acc);
      //update list
      this.users = this.accService.getUserList();
    }
  }

  onClickFilter() {
    if (this.keyFilter === undefined || this.keyFilter === '') {
      this.users = this.accService.getUserList()
    } else {
      this.users = this.accService.getUserList()
      if (this.selectFilter === 'username') {
        this.users = this.users.filter(x => x.username.indexOf(this.keyFilter) != -1)
      }
      if (this.selectFilter === 'email') {
        this.users = this.users.filter(x => x.email.indexOf(this.keyFilter) != -1)
      }
    }
  }

  onClearFilter(){
    this.selectFilter = '--Select Filter--';
    this.keyFilter = '';
    this.users = this.accService.getUserList()
  }

  onKD(e: any) {
    if (e.keyCode === 13) {
      this.onClickFilter();
    }
  }

}
