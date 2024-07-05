import { ICart } from "./cart.model";
import { IProduct } from "./product.model";

export interface IOrder {
  _id: string;
  items: ICart[];
  shippingAddress: string[];
  totalAmount: string[];
  totalQuantity: string[];
  userId: string;
  status: string;
}