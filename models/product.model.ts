import { ProductImages } from "./productImages.model"

export type Product = {
  sizes : string,
  color : string,
  fitting : string,
  fabric: string,
  fabricWeight: number,
  washType : string,
  moq : number,
  price : number,
  articleNo : number,
  dept: string,
  category : string,
  type : string,
  length : string,
  productImages : ProductImages,
  slug:string
}