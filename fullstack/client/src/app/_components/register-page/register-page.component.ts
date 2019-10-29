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
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
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
      .subscribe(res => this.router.navigate(["/app/main"]));
  }
}
