import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppMaterialModule } from "./material.module";
import { MatDialogModule } from '@angular/material';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "../app/app.component";
import { MainWrapperComponent } from "./_components/main-wrapper/main-wrapper.component";
import { CreateUserComponent } from "./_components/main-wrapper/create-user/create-user.component";
import { UserInfoComponent } from "./_components/main-wrapper/user-info/user-info.component";
import { MainPageComponent } from "./_components/main-wrapper/main-page/main-page.component";
import { LoginPageComponent } from "./_components/login-page/login-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterPageComponent } from "./_components/register-page/register-page.component";

import { UserDialogComponent } from './_components/main-wrapper/user-info/user-dialog/user-dialog.component';
import { UserDialogAddressComponent } from './_components/main-wrapper/user-info/user-dialog-address/user-dialog-address.component'


@NgModule({
  declarations: [
    AppComponent,
    UserDialogComponent,
    MainWrapperComponent,
    CreateUserComponent,
    UserInfoComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UserDialogAddressComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  entryComponents: [
    UserDialogComponent,
    UserDialogAddressComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
