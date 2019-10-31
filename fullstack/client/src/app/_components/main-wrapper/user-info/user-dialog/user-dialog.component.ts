import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";


@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.css"]
})
export class UserDialogComponent implements OnInit {
  popupGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.popupGroup = this._formBuilder.group({
      firstName: this.data.user.firstName,
      lastName: this.data.user.lastName,
      userName: this.data.user.userName,
      phone: this.data.user.phone,
      email:this.data.user.email,
    });
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser() {
    console.log("update user");
  }
}
