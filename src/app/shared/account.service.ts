import { Account } from './account.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: Account[] = [
    new Account('test', 'test', true, 'Arthur', 'test@gmail.com','0934123123'),
    new Account('demo', 'demo', false, 'Billy', 'demo@gmail.com','0922123127'),
    new Account('jimmy', 'jimmy', false, 'James', 'james@gmail.com','0933773434'),
    new Account('charlie', 'charlie', false, 'Charles', 'charlie@gmail.com','0912343434'),
    new Account('erik', 'erik', false, 'Erik', 'erik@gmail.com','0922344522'),
    new Account('duke', 'duke', true, 'Duke', 'duke@gmail.com','0934123121'),
    new Account('defo', 'defo', false, 'Erin', 'erin@gmail.com','0922123126'),
    new Account('demino', 'demino', false, 'Demino', 'demino@gmail.com','0933773777'),
    new Account('thomas', 'thomas', false, 'thomas', 'Thomas@gmail.com','0912343882'),
    new Account('erika', 'erika', false, 'Erika', 'erika@gmail.com','0922999522'),
  ]
  
  constructor(private router: Router) {}

  getAccountList(){
    return this.accounts;
  }

  checkExists(username: string, password: string){
    let acc = this.accounts.find(x => x.username === username && x.password === password)
    if(acc){
      return true;
    } else{
      return false;
    }
  }

  //method getLoginUser(localstorage.getItem())
  getLoginUser(){
    return this.accounts.find(x => x.username === localStorage.getItem('loginUser'))
  }

  getAccount(username: string){
    return this.accounts.find(x => x.username === username)
  }

  performLogin(username: string){
    let acc = this.getAccount(username)
    if(acc){
      localStorage.setItem('loginUser',username);
      if(acc.isAdmin){
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }
    }
  }

  getUserList(){
    return this.accounts.filter(x =>  x.isAdmin === false)
  }

  addUser(acc: Account){
    this.accounts.push(acc);
  }

  updateUser(username: string, newAcc: Account){
    let acc = this.getAccount(username);
    acc.fullname = newAcc.fullname;
    acc.email = newAcc.email;
    acc.phone = newAcc.phone;
    acc.gender = newAcc.gender;
    acc.dob = newAcc.dob;
    acc.ageGroup = newAcc.ageGroup;
  }

  removeAccount(acc: Account){
    this.accounts = this.accounts.filter(x => x.username !== acc.username)
  }
}
