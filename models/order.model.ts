import { ICart } from "./cart.model";
import { IProduct } from "./product.model";

export interface IOrder {
  order_id: string;
  cart_items: string;
  shipping_address: string[];
  total_amount: string[];
  total_quantity: string[];
  user_id: string;
  order_status: string;
}