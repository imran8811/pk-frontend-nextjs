import { FC, useEffect, createRef, useRef } from 'react'
import useState from 'react-usestateref'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { PRODUCT_API, IMAGE_UPLOAD, UPDATE_PRODUCT_IMAGE_PATH, GET_ARTICLE_NO } from '../../endpoints'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
 

const AddProduct: FC = () => {
  const [currentStep, setCurrentStep, currentStepRef] = useState('stepProductInfo');
  const [blob, setBlob, blobRef] = useState<PutBlobResult | any>('');

  const { register, handleSubmit, getValues, setValue, watch, formState: { errors }} = useForm({
    defaultValues: {
      dept: "men",
      category: "jeans-pant",
      length: "long",
      articleNo: "",
      slug: "",
      sizes: "",
      fitting: "slim",
      fabric: "",
      fabricWeight: "",
      washType: "",
      moq: "",
      price: "",
      color: "",
      productImages:[]
    }
  });
  const ProductFrontImageRef = useRef<HTMLInputElement>(null);
  const ProductBackImageRef = useRef<HTMLInputElement>(null);
  const ProductOther1ImageRef = useRef<HTMLInputElement>(null);
  const ProductOther2ImageRef = useRef<HTMLInputElement>(null);
  const ProductOther3ImageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    getArticleNo()
  }, [])

  const getArticleNo = async() => {
    await axios({
      method: 'get',
      url: GET_ARTICLE_NO,
    }).then((res:any) => {
      if(res.statusText === 'OK'){
        const latestArticleNo = res.data+1
        setValue('articleNo', latestArticleNo.toString());
      }
    }).catch(err => {
      console.log(err);
    });
  }
  
  const onSubmit = async(data:any) => {
    await axios({
      method: 'post',
      url: PRODUCT_API,
      data: data,
    }).then((res:any) => {
      if(res.data.type === 'success'){
        setCurrentStep('stepImageUpload');
      }
    });
  }

  const uploadImages = async(e:any, imgType: string) => {
    e.preventDefault();
    let file;
    switch(imgType){
      case 'front': 
        if (ProductFrontImageRef.current?.files) {
          file = ProductFrontImageRef.current?.files[0]
        }
      break;
      case 'back': 
        if (ProductBackImageRef.current?.files) {
          file = ProductBackImageRef.current?.files[0]
        }
      break;
      case 'other1': 
        if (ProductBackImageRef.current?.files) {
          file = ProductBackImageRef.current?.files[0]
        }
      break;
      case 'other2': 
      if (ProductBackImageRef.current?.files) {
        file = ProductBackImageRef.current?.files[0]
      }
      break;
      case 'other3': 
        if (ProductBackImageRef.current?.files) {
          file = ProductBackImageRef.current?.files[0]
        }
      break;
      default :
      file = null;
    }
    const newBlob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/file-upload',
      multipart: true
    });
    setBlob(newBlob);
    updateImagePath(imgType);
  }

  const updateImagePath = async(imgType) => {
    let data;
    let frontImgUrl:string = '';
    let backImgUrl:string = '';
    let other1ImgUrl: string = '';
    let other2ImgUrl: string = '';
    let other3ImgUrl: string = '';
    switch(imgType){
      case 'front': 
      frontImgUrl = blobRef.current.url
      break;
      case 'back': 
      backImgUrl = blobRef.current?.url
      break;
      case 'other1': 
      other1ImgUrl = blobRef.current?.url
      break;
      case 'other2': 
      other2ImgUrl = blobRef.current?.url
      break;
      case 'other3': 
      other3ImgUrl = blobRef.current?.url
      break;
    }
    
    data = {
      articleNo : getValues('articleNo'),
      frontImgUrl,
      backImgUrl,
      other1ImgUrl,
      other2ImgUrl,
      other3ImgUrl,
      imgType, 
    }
    const res = await axios({
      method: "post",
      url: UPDATE_PRODUCT_IMAGE_PATH,
      data: data,
    }).then(res => {
      if(res.data.type === 'success') {
        toast.success('Image Uploaded')
      }
    })
  }

  const stepChange = (stepType) => {
    if(stepType === 'stepProductInfo'){
      handleSubmit(onSubmit);
      setCurrentStep(stepType);
    } else {
      setCurrentStep(stepType);
    }
  }

  return (
    <div className='col-lg-12 mt-5 mb-5'>
      <div className='row justify-content-center'>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className='row mb-3'>
            { currentStepRef.current === 'stepProductInfo' &&
              <>
                <h2 className='text-center mb-5'>Add Product</h2>
                <div className='col-4'>
                  <label htmlFor='dept'>Dept.</label>
                  <select {...register('dept', { required: true })} className="select-input">
                    <option value='men'>Men</option>
                    <option value='women'>Women</option>
                    <option value='boys'>Boys</option>
                    <option value='girls'>Girls</option>
                  </select>
                </div>
                <input type='hidden' {...register('productImages')} />
                <div className='col-4 mb-3'>
                  <label htmlFor='category'>Category</label>
                  <select {...register('category', { required: true })} className="select-input">
                    <option value='jeans-pant'>Jeans Pant</option>
                    <option value='chino-pant'>Chino Pant</option>
                    <option value='cargo-trouser'>Cargo Trouser</option>
                    <option value='biker-jeans'>Biker Jeans</option>
                  </select>
                </div>
                <div className='col-4'>
                  <label htmlFor='length'>Product Length</label>
                  <select {...register('length', { required: true })} className="select-input">
                    <option value='long'>Long</option>
                    <option value='short'>Short</option>
                  </select>
                </div>
                <div className='col-4 mb-3'>
                  <label htmlFor='article-no'>Article No.</label>
                  <input type="text" id='article-no' {...register('articleNo', {required: true, valueAsNumber : false})} className='form-control' />
                </div>
                <div className='col-4 mb-3'>
                  <label htmlFor='product-slug'>Product Slug</label>
                  <input type="text" id='product-slug' {...register('slug', {required: true})} className='form-control' />
                </div>
                <div className='col-4'>
                  <label htmlFor='sizes'>Sizes</label>
                  <input type="text" id='sizes' {...register('sizes', {required: true})} className='form-control' />
                </div>
                <div className='col-4 mb-3'>
                  <label htmlFor='fitting'>Fitting</label>
                  <select id='fitting' {...register('fitting', { required: true })} className="form-control">
                    <option value='slim'>Slim</option>
                    <option value='straight'>Straight</option>
                    <option value='skinny'>Skinny</option>
                    <option value='regular'>Regular</option>
                    <option value='ankle'>Ankle</option>
                  </select>
                </div>
                <div className='col-4'>
                  <label htmlFor='fabric'>Fabric Content</label>
                  <input type="text" id='fabric' {...register('fabric', {required: true})} className='form-control' />
                </div>
                <div className='col-4 mb-3'>
                  <label htmlFor='fabric-weight'>Fabric Weight</label>
                  <input type="text" id='fabric-weight' {...register('fabricWeight', {required: true})} className='form-control' />
                </div>
                <div className='col-4'>
                  <label htmlFor='wash-type'>Wash Type</label>
                  <input type="text" id='wash-type' {...register('washType', {required: true})} className='form-control' />
                </div>
                <div className='col-4'>
                  <label htmlFor='moq'>MOQ</label>
                  <input type="text" id='moq' {...register('moq', {required: true})} className='form-control' />
                </div>
                <div className='col-4 mb-3'>
                  <label htmlFor='color'>Color</label>
                  <input type="text" id='colors' {...register('color', {required: true})} className='form-control' />
                </div>                                                                          
                <div className='col-4'>
                  <label htmlFor='price'>Price</label>
                  <input type="text" id='price' {...register('price', {required: true})} className='form-control' />
                </div>
                <div className='d-grid gap-2 pt-4'>
                  <button type="submit" className='btn btn-primary btn-block'>Upload Photos</button>
                </div>
              </>
            }
            { currentStepRef.current === 'stepImageUpload' &&
              <>
                <span className='fa' onClick={() => {stepChange('stepProductInfo')}}>Back</span>
                <h2 className='text-center mb-5'>Upload Images</h2>
                <div className='col-4 mb-5'>
                  <label htmlFor='frontImg'>Front Image</label>
                  <input 
                    type="file" 
                    id='frontImg' 
                    className="form-control"
                    ref={ProductFrontImageRef}
                    multiple 
                    onChange={(e)=> {uploadImages(e, 'front')}}
                  />
                </div>
                <div className='col-4'>
                  <label htmlFor='backImg'>Back Image</label>
                  <input 
                    type="file" 
                    id='backImg' 
                    className="form-control"
                    ref={ProductBackImageRef}
                    multiple 
                    onChange={(e)=> {uploadImages(e, 'back')}}
                  />
                </div>
                <div className='col-4'>
                  <label htmlFor='other1Img'>Other 1</label>
                  <input 
                    type="file" 
                    id='other1Img'
                    className="form-control"
                    ref={ProductOther1ImageRef}
                    multiple 
                    onChange={(e)=> {uploadImages(e, 'other1')}}
                  />
                </div>
                <div className='col-4 mb-3'>
                  <label htmlFor='other2Img'>Other 2</label>
                  <input 
                    type="file" 
                    id='other2Img'
                    className="form-control"
                    ref={ProductOther2ImageRef}
                    multiple 
                    onChange={(e)=> {uploadImages(e, 'other2')}}
                  />
                </div>
                <div className='col-4'>
                  <label htmlFor='other3Img'>Other 3</label>
                  <input 
                    type="file" 
                    id='other3Img'
                    className="form-control"
                    ref={ProductOther3ImageRef}
                    multiple 
                    onChange={(e)=> {uploadImages(e, 'other3')}}
                  />
                </div>
                <div className='d-grid gap-2 pt-4'>
                  <button 
                    type="button" 
                    className='btn btn-primary btn-block' 
                    onClick={() => router.push('/admin/products')}>Done</button>
                </div>
              </>
            }
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
)}

export default AddProduct;
