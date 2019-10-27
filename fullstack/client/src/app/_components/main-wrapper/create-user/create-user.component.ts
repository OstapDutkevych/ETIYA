import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userData: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userData = this.formBuilder.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      userName: ['', Validators.required ],
      phone: ['', Validators.required ],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]
    });
  }

getDataUser(){
  console.log(this.userData.value);
}

}
