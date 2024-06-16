import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../interceptors/axios.interceptor';
import { CREATE_ADMIN_USER } from '../../endpoints'
import { useRouter } from "next/dist/client/router";

const CreateAdminUser: FC = () => {
  const router = useRouter();
  const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm();

  const onSubmit = async(data:any) => {
    await axiosInstance({
      method: 'post',
      url: CREATE_ADMIN_USER,
      data: data,
    }).then((res:any) => {
      if(res.data.type === 'success'){
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('adminToken', res.data.token)
        }
        router.push('/admin/add-product')
      }
    });
  } 

  return (
    <div className='col-lg-12 mt-5 mb-5'>
      <div className='row justify-content-center'>
        <h2 className='text-center mb-3'>Create New Admin</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className='col-lg-6'>
          <div className='mb-3'>
            <input type="text"  {...register('name', {required: true})} placeholder='Name' className='form-control' />
          </div>
          <div className='mb-3'>
            <input type="text"  {...register('email', {required: true})} placeholder='Email' className='form-control' />
          </div>
          <div className='mb-3'>
            <input type="password"  {...register('password', {required: true})} placeholder='Password' className='form-control' />
          </div>
          <div className='mb-3'>
            <button type="submit" className='btn btn-primary col-4'>Create</button>
          </div>
        </form>
      </div>
    </div>
)}

export default CreateAdminUser;
