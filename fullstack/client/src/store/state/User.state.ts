import { State, Action, StateContext } from "@ngxs/store";
import { User } from "../../app/_models/user";
import { LoginUser, LogoutUser } from "../action/User.action";
import { AuthService } from "src/app/_services/auth.service";
import { take, tap } from "rxjs/operators";
import { state } from "@angular/animations";
@State<User>({
  name: "user",
  defaults: {
    id: null,
    email: "",
    password: "",
    token: ""
  }
})
export class UserState {
  constructor(private authService: AuthService) {}
  @Action(LoginUser)
  LoginUser(ctx: StateContext<User>, { payload }: LoginUser) {
    return this.authService.loginData(payload).pipe(
      tap(res => {
        ctx.patchState(res);
      })
    );
  }


 @Action(LogoutUser)
 LogoutUser() {
        this.authService.logout();
    }
}