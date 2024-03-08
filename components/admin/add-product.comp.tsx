import { FC, useState, useEffect, createRef, useRef } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ADD_PRODUCT, IMAGE_UPLOAD } from '../../endpoints'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/dist/client/router';

const AddProduct: FC = () => {
  const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm();
  const router = useRouter();
  
  const onSubmit = async(data:any) => {
    await axios({
      method: 'post',
      url: ADD_PRODUCT,
      data: data,
    }).then((res:any) => {
      if(res.data.type === 'success'){
        router.push("/admin/products")
      }
    });
  }

  const uploadImages = async(e:any) => {
    e.preventDefault();
    const formData = new FormData();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      formData.append(`product_images[${i}]`, files[i])
    }
    formData.append('product_slug', getValues('product_slug'));
    formData.append('article_no', getValues('article_no'));
    const res = await axios({
      method: "post",
      url: IMAGE_UPLOAD,
      data: formData,
      headers: {"Content-Type": "multipart/form-data"},
    }).then(res => {
      if(res.data.type === 'success') {
        toast.success('Image Uploaded')
      }
    })
  }

  return (
    <div className='col-lg-12 mt-5 mb-5'>
      <div className='row justify-content-center'>
        <h2 className='text-center mb-3'>Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className='row mb-3'>
            <div className='col-4'>
              <label htmlFor='category'>Category</label>
              <select {...register('category', { required: true })} className="form-control">
                <option value='men'>Men</option>
                <option value='women'>Women</option>
                <option value='boys'>Boys</option>
                <option value='girls'>Girls</option>
              </select>
            </div>
            <div className='col-4 mb-3'>
              <label htmlFor='type'>Product Type</label>
              <select {...register('type', { required: true })} className="form-control">
                <option value='jeans-pant'>Jeans Pant</option>
                <option value='chino-pant'>Chino Pant</option>
                <option value='cargo-trouser'>Cargo Trouser</option>
                <option value='biker-jeans'>Biker Jeans</option>
              </select>
            </div>
            <div className='col-4'>
              <label htmlFor='length'>Product Length</label>
              <select {...register('length', { required: true })} className="form-control">
                <option value='long'>Long</option>
                <option value='short'>Short</option>
              </select>
            </div>
            <div className='col-4 mb-3'>
              <label htmlFor='article-no'>Article No.</label>
              <input type="text" id='article-no' {...register('article_no', {required: true})} className='form-control' />
            </div>
            <div className='col-4 mb-3'>
              <label htmlFor='product-slug'>Product Slug</label>
              <input type="text" id='product-slug' {...register('product_slug', {required: true})} className='form-control' />
            </div>
            {/* <div className='col-4'>
              <label htmlFor='name'>Product Name</label>
              <input type="text" id='name' {...register('name', {required: true})} className='form-control' />
            </div> */}
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
              <label htmlFor='colors'>Colors</label>
              <input type="text" id='colors' {...register('colors', {required: true})} className='form-control' />
            </div>
            <div className='col-4'>
              <label htmlFor='price'>Price</label>
              <input type="text" id='price' {...register('price', {required: true})} className='form-control' />
            </div>
            <div className='col-lg-4'>
              <label htmlFor='product-files'>Product Files</label>
              <input type="file" id='product-files' name='product_images' className="form-control" multiple onChange={(e)=> {uploadImages(e)}} />
            </div>
            <div className='col-4 pt-4'>
              <button type="submit" className='btn btn-primary col-4'>Submit</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
)}

export default AddProduct;
