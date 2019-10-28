
import { CreateUserService } from '../../../_services/create-user.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,FormGroup, FormControl } from '@angular/forms';
import { UserCreate } from '../../../_models/userCreate';
import { Router } from '@angular/router';


export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  dataAboutUser = {};

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  countries: Country[] = [
    {value: 'Poland', viewValue: 'Poland'},
    {value: 'Ukraine', viewValue: 'Ukraine'},
    {value: 'Turkey', viewValue: 'Turkey'}
  ];

  constructor(private _formBuilder: FormBuilder,
              private createUserService: CreateUserService,
              private router: Router
    ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['',Validators.required]

    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  saveCreateUser():void{
    const user = this.dataAboutUser;
    this.createUserService.createUser( user as UserCreate).subscribe(
      user => {
        if (user) {
          this.firstFormGroup.reset();
          this.secondFormGroup.reset();
          this.router.navigate(['/app/main']);
        }
      },
      err => console.log(err)
    )
  }

getDataUser(){
  this.dataAboutUser = {...this.firstFormGroup.value, ...this.secondFormGroup.value};
  console.log(this.dataAboutUser);
  }
}
