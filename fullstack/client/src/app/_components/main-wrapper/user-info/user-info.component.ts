import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { UserCreate } from "../../../_models/userCreate";
import { UserService } from "../../../_services/user.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserDialogComponent } from '../user-info/user-dialog/user-dialog.component';
import { User } from 'src/app/_models/user';

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  form: FormGroup;
  searchText: string = "";

  // bollean = false;
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
    private fb: FormBuilder,
    public dialog: MatDialog
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
  openDialog(user: UserCreate) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        user: user
      }
    });
    console.log(user)
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'The dialog was closed');
    });
  }
  // findItem(...arg){
  //   for( let item in arg){
  //     if(arg[item]){
  //       this.bollean = true;
  //     }
  //     }
  //   }
  }
