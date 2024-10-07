
  import { ICategory } from "./categoryInterface";
  
  export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: ICategory["id"];
  }
  
 
  