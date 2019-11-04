import { Addresses } from '../_models/userAddresses';
export class UserCreate {
  id:number;
  _id: number;
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  addresses: Addresses[];
  // addresses:[{addressType:string,country:string,city:string,address:string}];
  // city: string;
  // country: string;
  // address: string;
}
