import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Navigate } from "@ngxs/router-plugin";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoginUser } from "src/store/action/User.action";
import { User } from "../../_models/user";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  user: User;
  loginData: FormGroup;
  error: string;
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.loginData = this.formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^([A-Z|a-z|0-9](.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((.){0,1}[A-Z|a-z|0-9]){2}.[a-z]{2,3}$"
          )
        ])
      ],
      password: ["", Validators.required]
    });
  }

  loginUser() {
    this.user = this.loginData.value;
    if (!this.user) {
      return;
    }
    this.store.dispatch(new LoginUser(this.user)).subscribe(
      res => {
        JSON.stringify(res), this.store.dispatch(new Navigate(["/app/main"]));

      },
      err => (this.error = err.message)
    );
  }
}
