import { State, Action, StateContext } from "@ngxs/store";
import { UserCreate } from "../../app/_models/userCreate";
import { CreateUser } from "../action/User.create.action";
import { CreateUserService } from "src/app/_services/create-user.service";
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
  constructor(private createUserService: CreateUserService) {}
  @Action(CreateUser)
  CreateUserState(ctx: StateContext<UserCreate>, { payload }: CreateUser) {
    return this.createUserService.createUser(payload).pipe(
      tap(res => {
        ctx.patchState(res);
      })
    );
  }
}
