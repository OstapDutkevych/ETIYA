import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { UserCreate } from "../../../_models/userCreate";
import { UserService } from "../../../_services/user.service";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  form: FormGroup;
  searchText: string = "";

  users: UserCreate[] = [];
  firstname: string;

  displayedColumns = [
    "firstname",
    "lastname",
    "username",
    "email",
    "phone",
    "actions"
  ];

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getUsers();
  }

  buildForm(): void {
    this.form = this.fb.group({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      userName: new FormControl(""),
      phone: new FormControl(""),
      email: new FormControl("")
    });
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
