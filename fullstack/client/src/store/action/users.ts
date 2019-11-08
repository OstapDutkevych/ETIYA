import { UserCreate } from  '../../app/_models/userCreate';

export class CreateUser {
    static readonly type = '[Users] Login User';
    constructor(public payload: UserCreate) {}
}

export class GetAllUserName {
    static readonly type = '[Users] Get User Name';
}


   