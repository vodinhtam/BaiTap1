import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Account } from '../../shared/account.model';
import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit{
  @Input() acc: Account;
  @Input() isDisable: boolean = false;

  @Output() formClear = new EventEmitter<boolean>();

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
  }

  onSaveEdit(){
    //call Service to handle Update
    this.accountService.updateUser(localStorage.getItem("selectedUser"),this.acc);
    //send a message
    alert("Successfully updated user's info!")
    //call parent component to drop current selected user
    this.formClear.emit(true);
  }

  onCloseEdit(){
    if (confirm("Are your sure to quit editing and discard all changes?")) {
      this.formClear.emit(true);
    }
  }
}
