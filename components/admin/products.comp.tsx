import { FC, useEffect } from 'react'
import axiosInstance from '../../interceptors/axios.interceptor';
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
    if (typeof localStorage !== 'undefined') {
      // if(localStorage.getItem('adminToken')) {
      //   const token = localStorage.getItem('adminToken');
      //   axiosInstance.defaults.headers.common = {'Authorization': `Bearer ${token}`, 'accept': 'application/json'}
      // } else {
      //   router.push('/admin/login')
      // }
    }
    axiosInstance.get(GET_PRODUCTS).then(res => {
      console.log(res);
      if(res.data.length === 0) {
        setNoProductFound(true);
      } else {
        setProducts(res.data)
      }
    })
  }, [])

  const deleteProduct = async(articleNo:string, blobUrls: string[]) => {
    const res = await axiosInstance.delete(`${PRODUCT_API}/${articleNo}`).then(res => {
      if(res.data.type === 'success') {
        deleteBlob(blobUrls)
      }
    })
  }

  const deleteBlob = (blobUrls: string[]) => {
    for(let i=0; i < blobUrls.length; i++){
      const delBlob =  del(blobUrls[i], {
        token: 'vercel_blob_rw_iVSO8j7JEXHRJCvW_xbEKfE1fiDvvlUtRdOM5gnst958kWu'
      })
      delBlob.then(res => {
        console.log(res);
      })
    }
  }

  return (
    <div className='mt-5 mb-5'>
      <h2 className='text-center mb-3'>Products</h2>
      <div className='products'>
        <div className='boxes'>
        { productsRef.current && productsRef.current.map((product:any, index) => {
            return (
              <div className='box' key={index}>
                <Link href={"/admin/edit-product/"+product.p_id}>
                  <img src={product.image_front} alt="Product Front Image" width={200} height={250} />
                </Link>
                <ul className='list-group'>
                  <li className='list-item'>{product.slug}</li>
                  <li className='list-item'>{product.article_no}-${product.price}</li>
                  <li className='list-item'>{product.category}-{product.color}</li>
                  <li className='list-item'>{product.fabric}-{product.fabric_weight}</li>
                </ul>
                <div className='col-12'>
                  <button 
                      type='button' 
                      className='btn btn-danger' 
                      onClick={() => deleteProduct(product.p_id, [
                        product.image_front, 
                        product.image_back, 
                        product.image_side, 
                        product.image_other_one, 
                        product.image_other_two
                      ])}>Delete</button>
                    <a href={'/admin/add-product?action=d&pid='+product.p_id} target='_blank'>Duplicate</a>
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
  </div>
)}

export default Products;
