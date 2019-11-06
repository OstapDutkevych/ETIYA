import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../../app/_models/user';
import { LoginUser } from '../action/user-action';

export class UserStateModel {
    users: User[];
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})
export class UserState {

    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users;
    }

    @Action(LoginUser)
    add({getState, patchState }: StateContext<UserStateModel>, { payload }: LoginUser) {
        const state = getState();
        patchState({
            users: [...state.users, payload]
        });
    }
}