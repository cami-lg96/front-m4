import { IProduct } from "./productInterface";

export interface ICategory {
    id: number;
    name: string;
    products?: IProduct[];
  }
  