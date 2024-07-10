import { ProductImages } from "./productImages.model"

export type IProduct = {
  _id : string,
  sizes : string,
  color : string,
  fitting : string,
  fabric: string,
  fabricWeight: number,
  washType : string,
  moq : number,
  price : number,
  articleNo : string,
  dept: string,
  category : string,
  type : string,
  length : string,
  productImages : ProductImages,
  slug:string
  pieceWeight:string
}