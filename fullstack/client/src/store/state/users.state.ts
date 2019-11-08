import { State, Action, StateContext } from "@ngxs/store";
import { UserCreate } from "../../app/_models/userCreate";
import { CreateUser, GetAllUserName } from "../action/users";
import { CreateUserService } from "src/app/_services/create-user.service";
import { UserService } from "src/app/_services/user.service";
import { tap } from 'rxjs/operators';


@State<UserCreate>({
  name: "CreateUserState",
  defaults: {
    _id: null,
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword:'',
    addresses: []
  }
})

export class CreateUserState {
  constructor(private createUserService: CreateUserService,
    private userService: UserService) {}
  @Action(CreateUser)
  create(ctx: StateContext<UserCreate>, { payload }: CreateUser) {
    return this.createUserService.createUser(payload).pipe(
      tap(res => {
        ctx.patchState(res);
      })
    );
  }

  @Action(GetAllUserName)
  get() {
    return this.userService.getUsers();
  }
}

