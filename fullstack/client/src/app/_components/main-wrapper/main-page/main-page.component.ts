import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../_services/user.service";
import { UserCreate } from "../../../_models/userCreate";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  users: UserCreate[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe(users => (this.users = users));
  }
}
