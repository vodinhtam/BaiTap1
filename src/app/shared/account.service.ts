import { Account } from './account.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: Account[] = [
    new Account('test', 'test', true, 'Arthur', 'test@gmail.com','0934123123'),
    new Account('demo', 'demo', false, 'Billy', 'demo@gmail.com','0922123123'),
    new Account('demo1', 'demo1', false, 'James', '',''),
    new Account('demo2', 'demo2', false, 'Charles', 'demo@gmail.com',''),
    new Account('nemo', 'nemo', false, 'Erik', 'nemo@gmail.com','0922344522'),
  ]
  constructor(private router: Router) {}

  getAccountList(){
    return this.accounts;
  }

  checkExists(username: string, password: string){
    let acc = this.accounts.filter(x => {
      return x.username == username && x.password == password
    })[0]
    if(acc){
      return true;
    } else{
      return false;
    }
  }

  getAccount(username: string){
    let usernameFilter = this.accounts.filter(x => {
      return x.username === username
    })
    return usernameFilter[0];
  }

  performLogin(username: string){
    let acc = this.getAccount(username)
    if(acc){
      localStorage.setItem('currentAccount',username);
      if(acc.isAdmin){
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }
    }
  }

  getUserList(){
    let users = this.accounts.filter(x => {
      return x.isAdmin === false
    })
    return users;
  }

  addUser(acc: Account){
    this.accounts.push(acc);
  }

  updateUser(username: string, newAcc: Account){
    let acc = this.getAccount(username);
    acc.username = newAcc.username;
    acc.name = newAcc.name;
    acc.email = newAcc.email;
    acc.phone = newAcc.phone;
  }

  removeAccount(acc: Account){
    let filterArray = this.accounts.filter(x => {
      return x.username !== acc.username
    })

    this.accounts = filterArray
  }
}
