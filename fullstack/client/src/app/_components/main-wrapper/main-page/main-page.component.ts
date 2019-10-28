import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { UserCreate } from '../../../_models/userCreate';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this._userService.getUsers()
    .subscribe(res => console.log(res));
  }
}
