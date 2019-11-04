import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CreateUserService } from "../../../../_services/create-user.service";
import { Countries } from "../../../../_models/country";
@Component({
  selector: 'app-user-dialog-address',
  templateUrl: './user-dialog-address.component.html',
  styleUrls: ['./user-dialog-address.component.css']
})
export class UserDialogAddressComponent implements OnInit {
  countries: Countries[];
  userAddressData: FormGroup;
  title: string;
  btnTitle: string;
  action: string;

  constructor(
    private createUserService: CreateUserService,
    public dialogRef: MatDialogRef<UserDialogAddressComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getCountry();
    this.userAddressData = this._formBuilder.group({
      _id: new FormControl(
        this.data.userAddresses._id,
        Validators.required
      ),
      addressType: new FormControl(
        this.data.userAddresses.addressType,
        Validators.required
      ),
      address: new FormControl(
        this.data.userAddresses.address,
        Validators.required
      ),
      city: new FormControl(this.data.userAddresses.city, Validators.required),
      country: new FormControl(
        this.data.userAddresses.country,
        Validators.required
      )
    });
    if (this.data.action === 'updateUserAddress') {
      this.title = 'Edit address';
      this.btnTitle = 'Save';
    } else if (this.data.action === 'deleteUserAddress') {
      this.title = 'Delete address';
      this.btnTitle = 'Delete';
    } else if (this.data.action === 'addUserAddress') {
      this.title = 'Add address';
      this.btnTitle = 'Add';
    }

    this.action = this.data.action;
  }
  getCountry():void{
    this.createUserService.getCountries().subscribe(
      countries => this.countries = countries,
      err => err
    )
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.dialogRef.close(this.userAddressData.value);
  }
}
