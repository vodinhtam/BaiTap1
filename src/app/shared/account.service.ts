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

  //so sanh filter method nay va method duoi, su khac nhau == va ===
  //tim hieu them ve y nghia 'if(variable)' bang cach chay thu
  //chuyen method filter => method find (find item in array ts)
  checkExists(username: string, password: string){
    let acc = this.accounts.filter(x => x.username === username && x.password === password)[0]
    if(acc){
      return true;
    } else{
      return false;
    }
  }

  //method getLoginUser(localstorage.getItem())

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
    acc.fullname = newAcc.fullname;
    acc.email = newAcc.email;
    acc.phone = newAcc.phone;
    acc.gender = newAcc.gender;
    acc.dob = newAcc.dob;
    acc.ageGroup = newAcc.ageGroup;
    
    console.log("🚀 ~ file: account.service.ts ~ line 69 ~ AccountService ~ updateUser ~ acc", acc)
  }

  removeAccount(acc: Account){
    this.accounts = this.accounts.filter(x => {
      return x.username !== acc.username
    })
  }
}
