import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { UserCreate } from "../../../_models/userCreate";
import { Addresses } from "src/app/_models/userAddresses";
import { UserService } from "../../../_services/user.service";
import { UserDialogComponent } from "../user-info/user-dialog/user-dialog.component";
import { UserDialogAddressComponent } from "./user-dialog-address/user-dialog-address.component";
import { MatTable } from "@angular/material";
@Component({
  selector: "app-user-info",
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
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog
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
  }
  getValueInput(formValue: any) {
    this.getUsers();
    const searchFilterData = formValue.value;
    console.log(searchFilterData);
    console.log(this.users);
    this.users.filter(user => {
      console.log(user);
      for (let key in searchFilterData) {
        // if (searchFilterData[key].includes(user[key])) {
        if (searchFilterData[key]!='' && searchFilterData[key].includes(user[key])) {
         
        console.log(user[key].search(searchFilterData) == -1)
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
    this.userService
      .getUsers()
      .subscribe(users => (this.users = users), err => err);
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

  addUpdateUserAddress(dataUser: UserCreate): void {
    this.userService.updateUser(dataUser).subscribe(res => res, error => error);
  }

  deleteAddress(dataUser: UserCreate) {
    this.userService.updateUser(dataUser).subscribe(res => res, error => error);
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
  selectUser(user: UserCreate) {
    this.userAddresses = user.addresses;
    this.selectedUser = user;
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
        this.addUpdateUserAddress(this.selectedUser);
        this.getUsers();
        this.table.renderRows();
      } else if (dataUserAddress && action === "updateUserAddress") {
        for (let key in this.selectedUser.addresses) {
          if (this.selectedUser.addresses[key].id === dataUserAddress.id) {
            this.selectedUser.addresses[key] = dataUserAddress;
          }
        }
        this.selectedUser;
        this.addUpdateUserAddress(this.selectedUser);
        this.table.renderRows();
      } else if (userAddresses && action === "deleteUserAddress") {
        this.selectedUser.addresses.splice(dataUserAddress.id, 1);
        this.deleteAddress(this.selectedUser);
        this.table.renderRows();
      }
    });
  }
}
