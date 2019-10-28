export class UserCreate {
  id: Number;
  firsName: String;
  lastName: String;
  userName: String;
  phone: Number;
  email: {
    type: String;
    required: true;
    unique: true;
  };
  password: {
    type: String;
    required: true;
  };
  city: {
    type: String;
  };
  address: {
    type: String;
  };
}
