import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,FormGroup } from '@angular/forms';

import {MatTableDataSource} from '@angular/material/table';

export interface City {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  property: string;
  value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {property: 'First Name', value:'Ostap'},
  {property: 'Last Name', value:'Vichnya'},
  {property: 'User Name', value:'Twist'},
  {property: 'Phone', value:'39849823742'},
  {property: 'E-mail', value:'ostap@gmai.com'},

];

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns: string[] = ['property', 'value'];
  dataAboutUser = {};

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  cities: City[] = [
    {value: 'steak-0', viewValue: 'Poland'},
    {value: 'pizza-1', viewValue: 'Ukraine'},
    {value: 'tacos-2', viewValue: 'Turkey'}
  ];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required]
    });
  }



getDataUser(){
  this.dataAboutUser = {...this.firstFormGroup.value, ...this.secondFormGroup.value};
  for(let prop in this.dataAboutUser){
  }
  console.log(this.dataAboutUser);
}

}
