import { UserCreate } from  '../../app/_models/userCreate';

export class CreateUser {
    static readonly type = '[CreateUserState] Login User';
    constructor(public payload: UserCreate) {}
}


  