import { CreateUserService } from "../../../_services/create-user.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { UserCreate } from "../../../_models/userCreate";
import { Router } from "@angular/router";

import { MustMatch } from "../../../helpers/must-match.validator";

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"]
})
export class CreateUserComponent implements OnInit {

  dataAboutUser = {};

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  countries: Country[] = [
    { value: "Poland", viewValue: "Poland" },
    { value: "Ukraine", viewValue: "Ukraine" },
    { value: "Turkey", viewValue: "Turkey" }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private createUserService: CreateUserService,
    private router: Router
  ) {}

  ngOnInit() {
    (this.firstFormGroup = this._formBuilder.group(
      {
        firstName: new FormControl("", [
          Validators.required,
          Validators.minLength(2)
        ]),
        lastName: new FormControl("", [
          Validators.required,
          Validators.minLength(2)
        ]),
        userName: new FormControl("", [
          Validators.required,
          Validators.minLength(2)
        ]),
        phone: new FormControl("", [
          Validators.required,
          Validators.minLength(4)
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
    )),
      (this.secondFormGroup = this._formBuilder.group({
        address: new FormControl("", [
          Validators.required,
          Validators.minLength(4)
        ]),
        city: new FormControl("", [
          Validators.required,
          Validators.minLength(4)
        ]),
        country: new FormControl("", [Validators.required])
      }));
  }

  saveCreateUser(): void {
    const user = this.dataAboutUser;
    this.createUserService.createUser(user as UserCreate).subscribe(
      user => {
        if (user) {
          this.firstFormGroup.reset();
          this.secondFormGroup.reset();
          this.router.navigate(["/app/main"]);
        }
      },
      err => err
    );
  }

  getDataUser() {
    this.dataAboutUser = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    };
  }
}
