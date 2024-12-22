import { IProduct } from "./product.model";

export interface ICart {
  cart_id: string;
  user_id: string;
  p_id: string;
  cart_sizes: string[];
  quantity: string[];
  price: number;
  instructions: string;
  amount: string;
  article_no: string;
  document_link: string;
  slug: string;
}