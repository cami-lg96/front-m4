  
  import { IUser } from "./userInterface";
  import { IProduct } from './productInterface';
  
  export interface IOrder {
    id: number;
    status: string;
    date: Date;
    user: IUser;
    products: IProduct[];
  }

  export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}