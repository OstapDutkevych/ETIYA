import { CreateUserService } from "../../../_services/create-user.service";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { UserCreate } from "../../../_models/userCreate";
import { Countries } from "../../../_models/country";
import { Router } from "@angular/router";

import { MustMatch } from "../../../helpers/must-match.validator";
import { CreateUser } from 'src/store/action/users.action';
import { Navigate } from '@ngxs/router-plugin';

export interface Country {
  value: string;
  viewValue: string;
}
export interface addressType {
  value: string;
}

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"]
})
export class CreateUserComponent implements OnInit {
  countries: Countries[];
  dataAboutUser = {};
  user: UserCreate;
  users: UserCreate[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  addressTypes: addressType[] = [
    { value: "Billing Address" },
    { value: "Shipment Address" },
    { value: "Home Address" }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private createUserService: CreateUserService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.getCountry();  
    this.firstFormGroup = this._formBuilder.group(
      {
        firstName: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("^[A-Z|a-z|]{3,15}$")
        ]),
        lastName: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("^[A-Z|a-z|]{3,15}$")
        ]),
        userName: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("^[A-Z|a-z|]{3,15}$")
        ]),
        phone: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$")
        ]),
        email: new FormControl("", [
          Validators.required,
          Validators.pattern(
            "^([A-Z|a-z|0-9](.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((.){0,1}[A-Z|a-z|0-9]){2}.[a-z]{2,3}$"
          )
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(4)
        ]),
        confirmPassword: new FormControl("", [Validators.required])
      },
      { validator: MustMatch("password", "confirmPassword") }
    ),
      this.secondFormGroup = this._formBuilder.group({
        id: new FormControl(0),
        addressType: new FormControl("", [Validators.required]),
        address: new FormControl("", [
          Validators.required,
          Validators.minLength(4)
        ]),
        city: new FormControl("", [
          Validators.required,
          Validators.minLength(4)
        ]),
        country: new FormControl("", [Validators.required])
      });
  }

  saveCreateUser(): void {
    const dataAboutUser = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    };
    this.user = dataAboutUser

   this.store.dispatch(new CreateUser(this.user)).subscribe(
      user => {
        if (user) {
            this.firstFormGroup.reset();
            this.secondFormGroup.reset();
            this.store.dispatch(new Navigate(["/app/main"]));
        }
      },
      err => err
    );
  }
  getCountry(): void {
    this.createUserService
      .getCountries()
      .subscribe(countries => (this.countries = countries), err => err);
  }

}
