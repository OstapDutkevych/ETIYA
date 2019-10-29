import { Pipe, PipeTransform } from "@angular/core";
import { UserCreate } from "../../../_models/userCreate";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(users: UserCreate[], searchText: string): any[] {
    if (!users) {
      return [];
    }
    if (!searchText) {
      return users;
    }

    searchText = searchText.toLowerCase();
    return users.filter(user => {
      return user.firstName.toLowerCase().includes(searchText) 
      || user.lastName.toLowerCase().includes(searchText) 
      || user.userName.toLowerCase().includes(searchText)
      || user.phone.toLowerCase().includes(searchText)  
      || user.email.toLowerCase().includes(searchText);
    });
  }
}

