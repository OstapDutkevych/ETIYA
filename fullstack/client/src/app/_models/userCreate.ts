import { Addresses } from '../_models/userAddresses';
export interface UserCreate {
  _id:string;
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  addresses: Addresses[];
}
