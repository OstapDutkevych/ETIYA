import { State, Action, StateContext, Select, Selector } from "@ngxs/store";
import { UserCreate } from "../../app/_models/userCreate";
import { CreateUser, getAllUsers, AddUserAddress } from "../action/users.action";
import { CreateUserService } from "src/app/_services/create-user.service";
import { UserService } from "src/app/_services/user.service";
import { tap, take } from "rxjs/operators";

export class UsersStateModel {
  users: UserCreate[];
  createUser: UserCreate = {
    _id: null,
    firstName: "",
    lastName: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    addresses: []
  };
}

@State<UsersStateModel>({
  name: "UsersState",
  defaults: {
    users: [],
    createUser: null
  }
})
export class CreateUserState {
  constructor(
    private createUserService: CreateUserService,
    private userService: UserService
  ) {}

  @Selector()
  static getUsers(state: UsersStateModel) {
    return state.users;
  }

  @Action(CreateUser)
  create(ctx: StateContext<UsersStateModel>, { payload }: CreateUser) {
    return this.createUserService.createUser(payload).pipe(
      tap(res => {
        ctx.patchState({
          ...ctx,
          createUser: res
        });
      })
    );
  }

  @Action(getAllUsers)
  getAllUsers(ctx: StateContext<UsersStateModel>) {
    return this.userService.getUsers().pipe(
      tap(res => {
        ctx.patchState({
          ...ctx,
          users: res
        });
      })
    );
  }
  @Action(AddUserAddress)
  addUserAddress(
    ctx: StateContext<UsersStateModel>,
    { payload }: AddUserAddress
  ) {
    return this.userService.updateUser(payload).pipe(
      take(1),
      tap(res => {
        const state = ctx.getState();
        const users = [...state.users];
        const userIndex = users.findIndex(item => item._id === payload._id);
        users[userIndex] = payload;
        ctx.setState({
          ...state,
          users: [...users]
        });
      })
    );
  }
}

