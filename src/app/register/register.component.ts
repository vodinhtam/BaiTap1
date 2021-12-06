import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../shared/account.service';
import { Account } from '../shared/account.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges {
  regForm: FormGroup;

  constructor(private accService: AccountService,private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      cfpassword: [''],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  ngOnChanges(): void {

  }

  onRegister(){
    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched()
    } else {
      let data = this.regForm.getRawValue();

      if (this.accService.getAccount(data.username)) {
        alert("This account has been taken! Choose another one!")
      } else if (data.password !== data.cfpassword) {
        alert("The password confirmation is not match!")
      } else {
          let acc = new Account(data.username, data.password, false, data.fullname, data.email, data.phone)

          this.accService.addUser(acc);
          alert("Account is successfully registered! Redirecting to Admin Panel!")

          this.router.navigate(['/login']);
      }
    }
  }
}