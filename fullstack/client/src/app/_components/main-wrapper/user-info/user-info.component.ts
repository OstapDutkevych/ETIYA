import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserCreate } from "../../../_models/userCreate";
import { UserService } from "../../../_services/user.service";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  displayedColumns = [
    "name",
    "surname",
    "username",
    "email",
    "phone",
    "actions"
  ];
  users: UserCreate[] = [];
  characters = [
    "Finn the human",
    "Jake the dog",
    "Princess bubblegum",
    "Lumpy Space Princess",
    "Beemo1",
    "Beemo2"
  ];

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService
      .getUsers()
      .subscribe(users => (this.users = users), err => console.log(err));
  }

  deleteUser(user: UserCreate): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe(res => res, error => error);
  }
}
