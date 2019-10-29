import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppMaterialModule } from "./material.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "../app/app.component";
import { MainWrapperComponent } from "./_components/main-wrapper/main-wrapper.component";
import { CreateUserComponent } from "./_components/main-wrapper/create-user/create-user.component";
import { UserInfoComponent } from "./_components/main-wrapper/user-info/user-info.component";
import { MainPageComponent } from "./_components/main-wrapper/main-page/main-page.component";
import { LoginPageComponent } from "./_components/login-page/login-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterPageComponent } from "./_components/register-page/register-page.component";

import { FilterPipe } from "./_components/main-wrapper/user-info/filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MainWrapperComponent,
    CreateUserComponent,
    UserInfoComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
