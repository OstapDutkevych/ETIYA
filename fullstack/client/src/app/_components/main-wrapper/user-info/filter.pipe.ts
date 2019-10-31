import { Pipe, PipeTransform } from '@angular/core';
import { UserCreate } from '../../../_models/userCreate';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(users: UserCreate[], nameSearch: string, surnameSearch: string, usernameSearch: string, phoneSearch: string, emailSearch: string) {
    if (users && users.length) {
        return users.filter(item => {
            if (nameSearch && item.firstName.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1) {
                return false;
            }
            if (emailSearch && item.email.toLowerCase().indexOf(emailSearch.toLowerCase()) === -1) {
                return false;
            }
            if (phoneSearch && item.phone.toLowerCase().indexOf(phoneSearch.toLowerCase()) === -1) {
                return false;
            }
            if (surnameSearch && item.lastName.toLowerCase().indexOf(surnameSearch.toLowerCase()) === -1) {
              return false;
              }
            if (usernameSearch && item.userName.toLowerCase().indexOf(usernameSearch.toLowerCase()) === -1) {
              return false;
            }
            // if(!nameSearch && !emailSearch && !phoneSearch && !surnameSearch && !usernameSearch){
            // return false;
            // }
            return true;
       });
    } else {
        return users;
    }
}
}