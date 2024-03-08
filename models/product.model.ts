import { ProductImages } from "./productImages.model"

export type Product = {
  sizes : string,
  colors : string,
  fitting : string,
  fabric: string,
  fabric_weight: number,
  wash_type : string,
  moq : number,
  price : number,
  article_no : number,
  category : string,
  type : string,
  length : string,
  product_images : ProductImages
}