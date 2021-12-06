import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { Account } from '../../shared/account.model';
import { AccountService } from '../../shared/account.service';
import { faAngleDoubleLeft, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  acc: Account;
  editForm: FormGroup;
  currentYear: number = new Date().getFullYear();
  genders = ['male', 'female', 'undefined']
  ageGroups = ['Adult(> 19 years old)', 'Teenager(13 - 19 years old)', 'Kid(< 13 years old)']
  dateIcon = faCalendarDay;

  goBackIcon = faAngleDoubleLeft;

  constructor(private accountService: AccountService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.acc = this.accountService.getAccount(localStorage.getItem('currentAccount'))
    this.editForm = this.fb.group({
      username: [this.acc.username, Validators.required],
      fullname: [this.acc.fullname, Validators.required],
      gender: [this.acc.gender, Validators.required],
      dob: [this.acc.dob, [Validators.required, this.dobValidator.bind(this)]],
      ageGroup: [this.acc.ageGroup, [Validators.required, this.ageGroupValidator.bind(this)]],
      email: [this.acc.email, Validators.required],
      phone: [this.acc.phone, Validators.required]
    });
  }

  dobValidator(formControl: FormControl) {
    if (this.editForm) {
      if (formControl.value) {
        if (+formControl.value.year < this.currentYear) {
          return null
        }
      }

    }
    return { 'dobInvalid': true }
  }

  ageGroupValidator(formControl: FormControl) {
    if (this.editForm) {
      let dob = this.editForm.get('dob').value;

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

  onUpdate() {
    if (this.editForm.invalid) {
      alert("Please fill all fields with correct data!")
      this.editForm.markAllAsTouched()
    } else {
      let data = this.editForm.getRawValue();
      let updatedAcc = new Account(data.username, this.acc.password, false, data.fullname, data.email, data.phone, data.gender, data.dob, data.ageGroup)

      //call Service to handle Update
      this.accountService.updateUser(this.acc.username, updatedAcc);
      //send a message
      alert("Successfully updated your admin's profile! Redirecting to Admin's Panel!")
      this.router.navigate(['/admin'])
    }
  }

  onCloseEdit() {
    if (confirm("Are your sure to quit editing and discard all changes?")) {
      this.router.navigate(['/admin']);
    }
  }

  onReset() {
    this.editForm.reset(this.acc)
  }

}
