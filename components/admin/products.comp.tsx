import { FC, useEffect } from 'react'
import axios from 'axios'
import { GET_PRODUCTS, PRODUCT_API } from '../../endpoints'
import { useRouter } from "next/navigation";
import useState from 'react-usestateref';
import Link from 'next/link';
import { del } from '@vercel/blob';

const Products: FC = () => {
  const basePath = 'http://localhost:8000'
  const router = useRouter();
  const [products, setProducts, productsRef] = useState([]);
  const [noProductFound, setNoProductFound, noProductFoundRef] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('adminToken')) {
      const token = localStorage.getItem('adminToken');
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`, 'accept': 'application/json'}
    } else {
      router.push('/admin/login')
    }
    axios.get(GET_PRODUCTS).then(res => {
      if(res.data.length === 0) {
        setNoProductFound(true);
      } else {
        setProducts(res.data)
      }
    })
  }, [])

  const deleteProduct = async(articleNo:string, blobUrls: string[]) => {
    const res = await axios.delete(`${PRODUCT_API}/${articleNo}`).then(res => {
      if(res.data.type === 'success') {
        deleteBlob(blobUrls)
      }
    })
  }

  const deleteBlob = (blobUrls: string[]) => {
    blobUrls.forEach(url => {
      const delBlob =  del(url, {
        token: 'vercel_blob_rw_iVSO8j7JEXHRJCvW_xbEKfE1fiDvvlUtRdOM5gnst958kWu'
      })
    })
  }

  return (
    <div className='col-lg-12 mt-5 mb-5'>
      <div className='row'>
        <h2 className='text-center mb-3'>Products</h2>
          { productsRef.current && productsRef.current.map((product:any, index) => {
              return (
                <div className='col-4' key={index}>
                  <Link href={"/admin/edit-product/"+product._id}>
                    <img src={product.productImages.frontImgUrl} alt="Product Front Image" width={200} />
                  </Link>
                  <ul className='list-group'>
                    <li className='list-item'>
                      <span>{product.articleNo}</span>
                    </li>
                    <li className='list-item'>
                      <span>{product.colors}</span>
                    </li>
                    <li className='list-item'>
                      <span>{product.category}</span>
                    </li>
                    <li className='list-item'>
                      <span>{product.type}</span>
                    </li>
                    <li className='list-item'>
                      <span>{product.length}</span>
                    </li>
                    <li className='list-item'>
                      <span>{product.moq} Pcs</span>
                    </li>
                    <li className='list-item'>
                      <span>PKR {product.price}</span>
                    </li>
                  </ul>
                  <div className='mb-3 mt-3'>
                    <button 
                      type='button' 
                      className='btn btn-danger' 
                      onClick={() => deleteProduct(product.articleNo, [
                        product.productImages.frontImgUrl, 
                        product.productImages.backImgUrl, 
                        product.productImages.other1ImgUrl, 
                        product.productImages.other2ImgUrl, 
                        product.productImages.other3ImgUrl
                      ])}>Delete</button>
                  </div>
                </div>
              )
            })
          }
          {noProductFound &&
            <div className='mt-5 mb-5'>
              <h3 className='text-danger'>No Product Found</h3>
            </div>
          }
      </div>
    </div>
)}

export default Products;
