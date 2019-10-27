import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/user';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginData = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.required ]
    });
  }

  loginUser():void{
    const user = this.loginData.value;
    if (!user) { return; }
    console.log(user);
    this.authService.loginData( user as User).subscribe(res => localStorage.setItem('token',JSON.stringify(res)));
    ;
  }

}

