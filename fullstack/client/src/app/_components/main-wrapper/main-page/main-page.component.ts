import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../_services/user.service";
import { UserCreate } from "../../../_models/userCreate";
import { Store, Select } from "@ngxs/store";
import { getAllUsers, CreateUser } from 'src/store/action/users.action';
import { CreateUserState } from '../../../../store/state/users.state'
import { Observable } from 'rxjs';

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
@Select(CreateUserState.getUsers) userList: Observable<CreateUser[]>;
  users: UserCreate[] = [];
  constructor(private userService: UserService, public store: Store) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.store.dispatch(new getAllUsers());
  }
}
