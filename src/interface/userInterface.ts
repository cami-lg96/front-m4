 import { ICredential } from './credentialInterface';
 import { IOrder } from './orderInterface';

 
enum Role {
    ADMIN = "admin",
    USER = "user"
}
 
 export interface IUser {
   id: number;
   name: string;
   email: string;
   address: string;
   phone: string;
   role: Role;
   credential: ICredential;
   orders: IOrder[];
   token?: string | null;
 }

export interface IRegister {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}

export interface ILogin {
  email: string;
  password: string;
}
