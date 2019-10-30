import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../../_services/auth.service";
import { User } from "../../_models/user";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  loginData: FormGroup;
  error;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginData = this.formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern('^([A-Z|a-z|0-9](.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((.){0,1}[A-Z|a-z|0-9]){2}.[a-z]{2,3}$')
        ])
      ],
      password: ["", Validators.required]
    });
  }

  loginUser(): void {
    const user = this.loginData.value;
    if (!user) {
      return;
    }
    this.authService.loginData(user as User).subscribe(
      res => {
        JSON.stringify(res), this.router.navigate(["/app/main"]);
      },
      err => (this.error = err.message)
    );
  }
}
