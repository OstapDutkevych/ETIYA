import { State, Action, StateContext } from "@ngxs/store";
import { User } from "../../app/_models/user";
import { LoginUser, LogoutUser } from "../action/User.action";
import { AuthService } from "src/app/_services/auth.service";
import { take, tap } from "rxjs/operators";
import { state } from "@angular/animations";

export class LoginUserModalState {
  user: User = {
    id: null,
    email: "",
    password: "",
    token: ""
  };
}
@State<LoginUserModalState>({
  name: "userState",
  defaults: {
    user: null
  }
})
export class UserState {
  constructor(private authService: AuthService) {}
  @Action(LoginUser)
  loginUser(ctx: StateContext<LoginUserModalState>, { payload }: LoginUser) {
    return this.authService.loginData(payload).pipe(
      tap(res => {
        ctx.patchState({ ...ctx, user: res });
      })
    );
  }

  @Action(LogoutUser)
  LogoutUser() {
    this.authService.logout();
  }
}
