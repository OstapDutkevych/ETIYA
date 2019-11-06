import { User } from  '../../app/_models/user';

export class LoginUser {
    static readonly type = '[User] Login';

    constructor(public payload: User) {}
}