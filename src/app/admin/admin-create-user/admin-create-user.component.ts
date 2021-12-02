import { Component, OnInit } from '@angular/core';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../../shared/account.service';
import { Router } from '@angular/router';
import { Account } from '../../shared/account.model';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.css']
})
export class AdminCreateUserComponent implements OnInit {
  
  goBackIcon = faAngleDoubleLeft;
  username: string = '';
  password: string = '';
  cfpassword: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(private accService: AccountService,private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(){
    let acc: Account = this.accService.getAccount(this.username)
    if(acc){
      alert("This account has been taken! Choose another one!")
    } else if(this.password !== this.cfpassword) {
      alert("The password confirmation is not match!")
    } else {
      acc = new Account(this.username, this.password, false, this.name, this.email, this.phone)
      this.accService.addUser(acc);
      alert("Account is successfully registered! Redirecting to Admin Panel!")

      this.router.navigate(['/admin']);
    }
  }
}
