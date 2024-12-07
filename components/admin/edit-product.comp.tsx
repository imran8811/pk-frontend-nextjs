import { FC, useEffect, createRef, useRef } from 'react'
import useState from 'react-usestateref'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../interceptors/axios.interceptor'
import { UPDATE_PRODUCT_IMAGE_PATH, GET_PRODUCT_DETAILS, PRODUCT_API } from '../../endpoints'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter } from 'next/navigation';
import { type PutBlobResult, del } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { IProduct } from '../../models'
 

const EditProduct: FC = () => {
  const [productDetails, setProductDetails, productDetailsRef] = useState<IProduct>();
  const [currentStep, setCurrentStep, currentStepRef] = useState('stepProductInfo');
  const [blob, setBlob, blobRef] = useState<PutBlobResult | any>();
  const router = useRouter();
  const params = useParams();

  const { register, handleSubmit, getValues, setValue, watch, formState: { errors }} = useForm({
    defaultValues: {
      dept: "men",
      category: "jeans-pant",
      article_no: "",
      p_id: "",
      slug: "",
      sizes: "",
      fitting: "slim",
      fabric: "",
      fabric_weight: "",
      wash_type: "",
      moq: "",
      price: "",
      color: "",
      piece_weight: "",
    }
  });
  const ProductFrontImageRef = useRef<HTMLInputElement>(null);
  const ProductBackImageRef = useRef<HTMLInputElement>(null);
  const ProductOther1ImageRef = useRef<HTMLInputElement>(null);
  const ProductOther2ImageRef = useRef<HTMLInputElement>(null);
  const ProductOther3ImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProductDetails()
  }, [])

  const getProductDetails = async() => {
    await axiosInstance({
      method: 'get',
      url: GET_PRODUCT_DETAILS+"/"+params.id,
    }).then((res) => {
      console.log(res.data);
      setProductDetails(res.data);
      const data = res.data;
      setValue('article_no', data[0].article_no);
      setValue('p_id', data[0].p_id);
      setValue('dept', data[0].dept);
      setValue('category', data[0].category);
      setValue('slug', data[0].slug);
      setValue('sizes', data[0].sizes);
      setValue('fabric', data[0].fabric);
      setValue('fabric_weight', data[0].fabric_weight);
      setValue('wash_type', data[0].wash_type);
      setValue('moq', data[0].moq);
      setValue('color', data[0].color);
      setValue('price', data[0].price);
      setValue('piece_weight', data[0].piece_weight);
    }).catch((err) => {
      console.log(err)
    });
  }
  
  const onSubmit = async(formData:any) => {
    await axiosInstance({
      method: 'post',
      url: PRODUCT_API+'/'+params.id,
      data: formData,
    }).then((res:any) => {
      if(res.data.type === 'success'){
        toast.success(res.data.message);
        router.push('/admin/products');
      }
    }).catch((err) => {
      toast.error(err.message)
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
        if (ProductOther1ImageRef.current?.files) {
          file = ProductOther1ImageRef.current?.files[0]
        }
      break;
      case 'other2': 
      if (ProductOther2ImageRef.current?.files) {
        file = ProductOther2ImageRef.current?.files[0]
      }
      break;
      case 'other3': 
        if (ProductOther3ImageRef.current?.files) {
          file = ProductOther3ImageRef.current?.files[0]
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

  const deleteBlob = async(url) => {
    const delBlob = await del(url, {
      token: 'vercel_blob_rw_iVSO8j7JEXHRJCvW_xbEKfE1fiDvvlUtRdOM5gnst958kWu'
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    updateImagePath(undefined);
  }

  const updateImagePath = async(imgType) => {
    const data={
      article_no : getValues('article_no'),
      p_id : getValues('p_id'),
    };
    let image_front   : string = '';
    let image_back    : string = '';
    let image_side    : string = '';
    let image_other_one  : string = '';
    let image_other_two  : string = '';
    switch(imgType){
      case 'front': 
      image_front = blobRef.current.url,
      data['image_front'] = image_front;
      data['image_type'] = 'front';
      break;
      case 'back': 
      image_back = blobRef.current?.url
      data['image_back'] = image_back;
      data['image_type'] = 'back';
      break;
      case 'other1': 
      image_side = blobRef.current?.url
      data['image_side'] = image_side;
      data['image_type'] = 'side';
      break;
      case 'other2': 
      image_other_one = blobRef.current?.url
      data['image_other_one'] = image_other_one;
      data['image_type'] = 'image_other_one';
      break;
      case 'other3': 
      image_other_two = blobRef.current?.url
      data['image_other_two'] = image_other_two;
      data['image_type'] = 'image_other_two';
      break;
    }
    const res = await axiosInstance({
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
      <div className='row'>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className='row mb-3'>
            { currentStepRef.current === 'stepProductInfo' &&
              <>
                <h2 className='text-center mb-5'>Edit Product</h2>
                <div className='col-4'>
                  <label htmlFor='dept'>Dept.</label>
                  <select {...register('dept', { required: true })} className="select-input">
                    <option value='men'>Men</option>
                    <option value='women'>Women</option>
                    <option value='boys'>Boys</option>
                    <option value='girls'>Girls</option>
                  </select>
                </div>
                <input type='hidden' {...register('p_id')} />
                <div className='col-4 mb-3'>
                  <label htmlFor='category'>Category</label>
                  <select {...register('category', { required: true })} className="select-input">
                    <option value='jeans-pant'>Jeans Pant</option>
                    <option value='chino-pant'>Chino Pant</option>
                    <option value='cargo-trouser'>Cargo Trouser</option>
                    <option value='biker-jeans'>Biker Jeans</option>
                  </select>
                </div>
                {/* <div className='col-4'>
                  <label htmlFor='length'>Product Length</label>
                  <select {...register('length', { required: true })} className="select-input">
                    <option value='long'>Long</option>
                    <option value='short'>Short</option>
                  </select>
                </div> */}
                <div className='col-4 mb-3'>
                  <label htmlFor='article-no'>Article No.</label>
                  <input type="text" id='article-no' {...register('article_no', {required: true})} className='form-control' />
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
                  <select id='fitting' {...register('fitting', { required: true })} className="select-input">
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
                  <input type="text" id='fabric-weight' {...register('fabric_weight', {required: true})} className='form-control' />
                </div>
                <div className='col-4'>
                  <label htmlFor='wash-type'>Wash Type</label>
                  <input type="text" id='wash-type' {...register('wash_type', {required: true})} className='form-control' />
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
                <div className='col-4'>
                  <label htmlFor='piece-weight'>Weight per piece</label>
                  <input type="text" id='piece-weight' {...register('piece_weight', {required: true})} className='form-control' />
                </div>
                <div className='d-grid gap-2 pt-4'>
                  <button type="submit" className='btn btn-primary'>Update Product</button>
                  <button type="button" className='btn btn-primary' onClick={() => {setCurrentStep('stepImageUpload')}}>Upload Photos</button>
                </div>
              </>
            }
            { currentStepRef.current === 'stepImageUpload' &&
              <>
                <button type='button' className='btn-warning' onClick={() => {stepChange('stepProductInfo')}}>Back</button>
                <h2 className='text-center mb-5'>Upload Images</h2>
                <div className='col-4 mb-5'>
                  <label htmlFor='frontImg' className='mb-2'>Front Image</label>
                  <img src={productDetailsRef.current?.image_front} width={200} className='d-block mb-2' />
                  <button type='button' className='btn btn-danger' onClick={() => {deleteBlob(productDetailsRef.current?.image_front)}}>Delete Image</button>
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
                  <label htmlFor='backImg' className='mb-2'>Back Image</label>
                  <img src={productDetailsRef.current?.image_back} width={200} className='d-block mb-2' />
                  <button type='button' className='btn btn-danger' onClick={() => {deleteBlob(productDetailsRef.current?.image_back)}}>Delete Image</button>
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
                  <label htmlFor='other1Img' className='mb-2'>Other 1</label>
                  <img src={productDetailsRef.current?.image_side} width={200} className='d-block mb-2' />
                  <button type='button' className='btn btn-danger' onClick={() => {deleteBlob(productDetailsRef.current?.image_side)}}>Delete Image</button>
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
                  <label htmlFor='other2Img' className='mb-2'>Other 2</label>
                  <img src={productDetailsRef.current?.image_other_one} width={200} className='d-block mb-2' />
                  <button type='button' className='btn btn-danger' onClick={() => {deleteBlob(productDetailsRef.current?.image_other_one)}}>Delete Image</button>
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
                  <label htmlFor='other3Img' className='mb-2'>Other 3</label>
                  <img src={productDetailsRef.current?.image_other_two} width={200} className='d-block mb-2' />
                  <button type='button' className='btn btn-danger' onClick={() => {deleteBlob(productDetailsRef.current?.image_other_two)}}>Delete Image</button>
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

export default EditProduct;
