import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../../_services/auth.service";
import { User } from "../../_models/user";

@Component({
  selector: "register-login-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.css"]
})
export class RegisterPageComponent implements OnInit {
  registerData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerData = this.formBuilder.group({
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

  createUser(): void {
    const user = this.registerData.value;
    if (!user) {
      return;
    }
    this.authService
      .createData(user as User)
      .subscribe(res => this.router.navigate(["/auth/login"]));
  }
}
