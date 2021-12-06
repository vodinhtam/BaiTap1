import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Account } from '../../shared/account.model';
import { AccountService } from '../../shared/account.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() acc: Account;
  @Input() isDisable: boolean = false;

  @Output() clearSelectedUser = new EventEmitter<boolean>();

  editUserForm: FormGroup;
  currentYear: number = new Date().getFullYear();
  genders = ['male', 'female', 'undefined']
  ageGroups = ['Adult(> 19 years old)', 'Teenager(13 - 19 years old)', 'Kid(< 13 years old)']
  dateIcon = faCalendarDay;

  constructor(private accountService: AccountService, private fb: FormBuilder) { }


  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.editUserForm = this.fb.group({
      username: [this.acc.username, Validators.required],
      fullname: [this.acc.fullname, Validators.required],
      gender: [this.acc.gender, Validators.required],
      dob: [this.acc.dob, [Validators.required, this.dobValidator.bind(this)]],
      ageGroup: [this.acc.ageGroup, [Validators.required, this.ageGroupValidator.bind(this)]],
      email: [this.acc.email, Validators.required],
      phone: [this.acc.phone, Validators.required],
    });

    window.scrollTo(0,document.body.scrollHeight)
  }

  ngAfterViewInit() {
    window.scrollTo(0,document.body.scrollHeight)
  }

  onSaveEdit() {
    if (this.editUserForm.invalid) {
      this.editUserForm.markAllAsTouched()
    } else {
      let data = this.editUserForm.getRawValue();
      let updatedAcc = new Account(data.username, this.acc.password, false, data.fullname, data.email, data.phone, data.gender, data.dob, data.ageGroup)

      //call Service to handle Update
      this.accountService.updateUser(this.acc.username, updatedAcc);
      //send a message
      alert("Successfully updated user's info!")
      //call parent component to drop current selected user
      this.clearSelectedUser.emit(true);
    }

  }

  onCloseEdit() {
    if (confirm("Are your sure to quit editing and discard all changes?")) {
      this.clearSelectedUser.emit(true);
    }
  }

  onReset() {
    this.editUserForm.reset(this.acc)
  }

  dobValidator(formControl: FormControl) {
    if (this.editUserForm) {
      if (formControl.value) {
        if (+formControl.value.year < this.currentYear) {
          return null
        }
      }

    }
    return { 'dobInvalid': true }
  }

  ageGroupValidator(formControl: FormControl) {
    if (this.editUserForm) {
      let dob = this.editUserForm.get('dob').value;

      if (formControl.value === 'Kid(< 13 years old)') {
        if ((this.currentYear - (+dob.year)) < 13) {
          return null
        }
      }
      if (formControl.value === 'Adult(> 19 years old)') {
        if ((this.currentYear - (+dob.year)) > 19) {
          return null
        }
      }
      if (formControl.value === 'Teenager(13 - 19 years old)') {
        if (((this.currentYear - (+dob.year)) <= 19) && ((this.currentYear - (+dob.year)) >= 13)) {
          return null
        }
      }
    }
    return { 'ageGroupInvalid': true }
  }


}
