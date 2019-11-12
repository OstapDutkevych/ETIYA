import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { UserCreate } from "../../../_models/userCreate";
import { Addresses } from "src/app/_models/userAddresses";
import { UserService } from "../../../_services/user.service";
import { UserDialogComponent } from "../user-info/user-dialog/user-dialog.component";
import { UserDialogAddressComponent } from "./user-dialog-address/user-dialog-address.component";
import { MatTable } from "@angular/material";
import { Store, Select } from "@ngxs/store";
import { getAllUsers, AddUserAddress } from "src/store/action/users.action";
import { CreateUserState } from "src/store/state/users.state";
import { Observable } from "rxjs";
@Component({
  selector: "app-user-info",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  @ViewChild("useraddresses", { static: false }) table: MatTable<Addresses[]>;
  searchText: string = "";
  userAddresses: Addresses[];
  selectedUser: UserCreate;
  searchInput: FormGroup;
  users: UserCreate[] = [];
  allUsers: UserCreate[];
  firstname: string;

  displayedColumnsUser = [
    "firstname",
    "lastname",
    "username",
    "email",
    "phone",
    "actions"
  ];
  displayedColumnsAddresses = [
    "addressType",
    "address",
    "city",
    "country",
    "actions"
  ];

  @Select(CreateUserState.getUsers) usersList: Observable<UserCreate[]>;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public store: Store
  ) {}

  ngOnInit() {
    this.getUsers();
    this.searchInput = this.fb.group({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      userName: new FormControl(""),
      phone: new FormControl(""),
      email: new FormControl("")
    });
    this.usersList.subscribe(users => (this.users = users));
  }
  getValueInput(formValue: any) {
    this.getUsers();
    const searchFilterData = formValue.value;
    this.users.filter(user => {
      for (let key in searchFilterData) {
        if (
          searchFilterData[key] != "" &&
          searchFilterData[key].includes(user[key])
        ) {
          user[key].search(searchFilterData) == -1;
          let arr = [];
          arr.push(user);
          this.allUsers = arr;
        }
      }
    });
  }
  searchInputReset() {
    this.searchInput.reset();
  }

  getUsers() {
    this.store.dispatch(new getAllUsers());
  }

  deleteUser(user: UserCreate): void {
    this.allUsers = this.allUsers.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe(res => res, error => error);
  }
  updateUser(dataUser: UserCreate, user: UserCreate): void {
    user.firstName = dataUser.firstName;
    user.lastName = dataUser.lastName;
    user.userName = dataUser.userName;
    user.email = dataUser.email;
    user.phone = dataUser.phone;

    this.userService
      .updateUser(user)
      .subscribe(res => console.log(res), error => error);
  }

  selectUser(user: UserCreate) {
    this.userAddresses = user.addresses;
    this.selectedUser = user;
  }
  openDialog(action: string, user: UserCreate) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        user,
        action
      }
    });
    dialogRef.afterClosed().subscribe(dataUser => {
      if (dataUser && action === "updateUser") {
        this.updateUser(dataUser, user);
      } else if (dataUser && action === "deleteUser") {
        this.deleteUser(user);
      }
    });
  }
  openDialogUserAddress(action: string, userAddresses: Addresses[]) {
    const dialogRef = this.dialog.open(UserDialogAddressComponent, {
      width: "300px",
      data: {
        userAddresses,
        action
      }
    });
    dialogRef.afterClosed().subscribe(dataUserAddress => {
      if (dataUserAddress && action === "addUserAddress") {
        dataUserAddress.id += this.selectedUser.addresses.length;
        this.selectedUser.addresses.push(dataUserAddress);
        this.store
          .dispatch(new AddUserAddress(this.selectedUser))
          .subscribe(res => console.log(res), error => error);
        this.getUsers();
        this.table.renderRows();
      } else if (dataUserAddress && action === "updateUserAddress") {
        for (let key in this.selectedUser.addresses) {
          if (this.selectedUser.addresses[key].id === dataUserAddress.id) {
            this.selectedUser.addresses[key] = dataUserAddress;
          }
        }
        this.store
          .dispatch(new AddUserAddress(this.selectedUser))
          .subscribe(res => console.log(res), error => error);
        this.table.renderRows();
      } else if (dataUserAddress && action === "deleteUserAddress") {
        this.selectedUser.addresses = this.selectedUser.addresses.filter(
          address => address.id !== dataUserAddress.id
        );
        this.table.renderRows();
        this.store
          .dispatch(new AddUserAddress(this.selectedUser))
          .subscribe(res => console.log(res), error => error);
        
      }
    });
  }
}
