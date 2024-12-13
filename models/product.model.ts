import { ProductReviews } from "./product-reviews.model"

export type IProduct = {
  p_id : string,
  sizes : string,
  color : string,
  fitting : string,
  fabric: string,
  fabric_weight: number,
  wash_type : string,
  moq : number,
  price : number,
  article_no : string,
  dept: string,
  category : string,
  type : string,
  length : string,
  image_front: string,
  image_back: string,
  image_side: string,
  image_other_one: string,
  image_other_two: string,
  slug:string
  piece_weight:string
  reviews: ProductReviews[]
}