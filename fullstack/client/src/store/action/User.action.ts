import { User } from  '../../app/_models/user';

export class LoginUser {
    static readonly type = '[User] Login User';
    constructor(public payload: User) {}
}

export class LogoutUser {
    static readonly type = '[User] Logout User';
    constructor() {}
}
