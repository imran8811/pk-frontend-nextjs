import { ProductReviews } from "./product-reviews.model"

export type IProduct = {
  p_id : string,
  p_sizes : string,
  color : string,
  fitting : string,
  fabric_type: string,
  fabric_content: string,
  fabric_stretch: string,
  fabric_weight: number,
  front_fly : string,
  wash_type : string,
  product_name : string,
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