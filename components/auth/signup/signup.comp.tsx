import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { USER_SIGN_UP, WHOLESALE_SHOP } from '../../../endpoints'
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const SignupComp: FC = () => {
  const router = useRouter();
  const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm();

  const onSubmit = async(data:any) => {
    const res = await axios({
      method: 'post',
      url: USER_SIGN_UP,
      data: data,
    }).then((res:any) => {
      if(res.data.type === 'success'){
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('userData', JSON.stringify(res.data.data));
        }
        router.push(WHOLESALE_SHOP);
      }
    }).catch((err) => {
      toast.error(err.response.data.message)
    });
  } 

  return (
    <div className='col-lg-12 mt-5 mb-5'>
      <div className='row justify-content-center'>
        <h2 className='text-center mb-4'>User Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className='col-lg-4 col-md-6 col-12'>
          <div className='mb-3'>
            <input type="text"  {...register('businessName', {required: true})} placeholder='Business Name' className='form-control' />
          </div>
          <div className='mb-3'>
            <input type="text"  {...register('email', {required: true})} placeholder='Email' className='form-control' />
          </div>
          <div className='mb-3'>
            <input type="password"  {...register('password', {required: true})} placeholder='Password' className='form-control' />
          </div>
          <div className='mb-3'>
            <input type="text"  {...register('contactNo', {required: true})} placeholder='Contact No' className='form-control' />
          </div>
          <div className='mb-3 d-flex justify-content-between'>
            <Link href={'/login'} className='btn-link col-6'>Login</Link>
            <button type="submit" className='btn btn-success col-6'>Signup</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignupComp;
