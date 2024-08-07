import { IProduct } from "./product.model";

export interface ICart {
  _id: string;
  productId: string;
  sessionType: string;
  sizes: string[];
  quantity: string[];
  instructions: string;
  amount: string;
  productDetails: IProduct;
  documentLink: string;
}