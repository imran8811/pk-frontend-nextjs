import { IProduct } from "./product.model";

export interface ICart {
  cart_id: string;
  user_id: string;
  p_id: string;
  cart_sizes: string;
  quantity: string;
  price: number;
  instructions: string;
  cart_amount: string;
  article_no: string;
  document_link: string;
  slug: string;
  dept: string;
  category: string;
}