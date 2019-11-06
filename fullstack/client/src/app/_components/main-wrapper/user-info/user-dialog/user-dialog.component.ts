import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

import { UserCreate } from "../../../../_models/userCreate";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.css"]
})
export class UserDialogComponent implements OnInit {
  popupGroup: FormGroup;
  action: String;
  title: string;
  userData: FormGroup;
  user: UserCreate;
  typeButton: string;
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.popupGroup = this._formBuilder.group({
      // _id: this.data.user._id,
      firstName: this.data.user.firstName,
      lastName: this.data.user.lastName,
      userName: this.data.user.userName,
      phone: this.data.user.phone,
      email: this.data.user.email
    });
    if (this.data.action === "updateUser") {
      this.title = "Edit user";
      this.typeButton = "Update User";
    } else if (this.data.action === "deleteUser") {
      this.title = "Delete user";
      this.typeButton = "Delete";
    }
    this.action = this.data.action;
    this.user = this.data.user;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.dialogRef.close(this.popupGroup.value);
  }
}
