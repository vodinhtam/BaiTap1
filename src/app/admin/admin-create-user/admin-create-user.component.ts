import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../../shared/account.service';
import { Router } from '@angular/router';
import { Account } from '../../shared/account.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.css']
})
export class AdminCreateUserComponent implements OnInit, AfterViewInit {
  goBackIcon = faAngleDoubleLeft;
  createForm: FormGroup;

  @ViewChild('username') vc: ElementRef;

  constructor(private accService: AccountService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      cfpassword: [''],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  //set focus to username field on page load
  ngAfterViewInit(): void {
    this.vc.nativeElement.focus();
  }

  onCreate() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched()
    } else {
      let data = this.createForm.getRawValue();

      if (this.accService.getAccount(data.username)) {
        alert("This account has been taken! Choose another one!")
      } else if (data.password !== data.cfpassword) {
        alert("The password confirmation is not match!")
      } else {
          let acc = new Account(data.username, data.password, false, data.fullname, data.email, data.phone)

          this.accService.addUser(acc);
          alert("Account is successfully registered! Redirecting to Admin Panel!")

          this.router.navigate(['/admin']);
      }
    }
  }

  onGoBack() {
    
    if(confirm("Quit creating new user and go back to admin panel?")){
      this.router.navigate(['/admin']);
    }
  }
}
