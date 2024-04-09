import { FC, useEffect } from "react"
import useState from 'react-usestateref'
import { PRODUCT_API, basePath } from "../../endpoints"
import { Product } from "../../models"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useRouter, useSearchParams } from "next/navigation"

const ProductDetails : FC = (props:any) => {
  const [productDetails, setproductDetails, productDetailsRef] = useState<Product[]>(props.data);
  const params = useParams();

  useEffect(() => {
    getProductDetails();
  }, [])

  const getProductDetails = async () => {
    const res = await axios({
      method: "get",
      url: `${PRODUCT_API}/${params.dept}/${params.category}/${params.id}`
    }).then(res => {
      setproductDetails(res.data);
    })
  }

  return (
    <div className="mb-5">
      {productDetails && productDetails.map((product, index) => {
        return (
          <div className="row" key={index}>
            <h1 className="text-center mb-5">{product.slug} </h1>
            <div className="col-md-6">
              <img src={product.productImages.frontImgUrl} alt={product.productImages.frontImgUrl} className="img-thumbnail" />
            </div>
            <div className="col-md-6 ps-2">
              <ul>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">Article No.</span>
                  <span className="col-6 col-md-9">{product.articleNo}</span>
                </li>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">Fabric Details</span>
                  <span className="col-6 col-md-9">{product.fabricWeight + ' Ounce - ' + product.fabric}</span>
                </li>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">Colors</span>
                  <span className="col-6 col-md-9">{product.color}</span>
                </li>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">Waist Sizes</span>
                  <span className="col-6 col-md-9">{product.sizes}</span>
                </li>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">Wash Type</span>
                  <span className="col-6 col-md-9">{product.washType}</span>
                </li>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">Category</span>
                  <span className="col-6  col-md-9 text-capitalize">{product.category}</span>
                </li>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">Shipping</span>
                  <span className="col-6 col-md-9">By Air, Sea, DHL etc</span>
                </li>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">Delivery</span>
                  <span className="col-6 col-md-9">30 days</span>
                </li>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">MOQ</span>
                  <span className="col-6 col-md-9">{product.moq}</span>
                </li>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">Price</span>
                  <span className="col-6 col-md-9">${product.price}</span>
                </li>
                <li className="row mb-2">
                  <span className="col-6 col-md-3">Payment Terms</span>
                  <span className="col-6 col-md-9">60% Advance 40% before shipping</span>
                </li>
              </ul>
              <div className="mb-3 text-end">
                <button type="button" className="btn btn-primary">Order Now</button>
              </div>
            </div>
            <ToastContainer />
          </div>
        )        
      })}
    </div>
  )
}

export default ProductDetails;