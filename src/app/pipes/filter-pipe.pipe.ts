import { Pipe, PipeTransform } from '@angular/core';
import { Account } from '../shared/account.model';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(users: Account[], username: string, email: string): Account[] {
    if (username) {
      users = users.filter(x => x.username.indexOf(username) != -1)
    }
    if (email) {
      users = users.filter(x => x.email.indexOf(email) != -1)
    }
    return users;
  }

}
