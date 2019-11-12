import { UserCreate } from  '../../app/_models/userCreate';

export class CreateUser {
    static readonly type = '[Users] Create User';
    constructor(public payload: UserCreate) {}
}

export class getAllUsers {
    static readonly type = '[Users] Get All User ';
}

export class AddUserAddress {
    static readonly type = '[Users] Add User Address';
    constructor(public payload: UserCreate) {}
}


   