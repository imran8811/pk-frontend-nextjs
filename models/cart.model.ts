import { IProduct } from "./product.model";

export interface ICart {
  productId: string;
  sessionType: string;
  sizes: string[];
  quantity: string[];
  instructions: string;
  amount: string;
  productDetails: IProduct;
}