import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { CART_API, USER_LOGIN, WHOLESALE_SHOP } from '../../../endpoints'
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../interceptors/axios.interceptor';

const LoginComp: FC = () => {
  const router = useRouter();
  const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm();
  
  const searchParams = useSearchParams();
  const getQueryParamNextRoute = searchParams.get('next');

  const updateCartItemUserId = async(guestUserId, loggedInUserId) => {
    await axiosInstance({
      method: 'patch',
      url: `${CART_API}`,
      data: {
        guestUserId, 
        loggedInUserId
      }
    }).then(res => {
    }).catch((err) => {
      console.log(err);
    })
  }

  const onSubmit = async(data:any) => {
    await axios({
      method: 'post',
      url: USER_LOGIN,
      data: data,
    }).then((res:any) => {
      if(res.data.type === 'success'){
        if (typeof localStorage !== 'undefined') {
          const userData = JSON.parse(localStorage.getItem('userData')!);
          if(userData) {
            updateCartItemUserId(userData.userId, res.data.data.userId)
          } 
          localStorage.setItem('userData', JSON.stringify(res.data.data));
        }
        const nextRoute = getQueryParamNextRoute;
        nextRoute? router.push(getQueryParamNextRoute): router.push(WHOLESALE_SHOP)
      }
    }).catch((err) => {
      toast.error(err.response.data.message);
    }) ;
  } 

  return (
    <div className='page-content'>
      <div className='row justify-content-center'>
        <h2 className='mb-3 text-center'>User Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className='col-lg-5 col-md-6 col-12'>
          <div className='mb-4'>
            <input type="text"  {...register('email', {required: true})} placeholder='Email' className='form-control' />
          </div>
          <div className='mb-4'>
            <input type="password"  {...register('password', {required: true})} placeholder='Password' className='form-control' />
          </div>
          <div className='row mb-3'>
            <div className='col-6'>
              <Link href={'/forgot-password'} className='btn-link d-block mb-2'>Forgot Password?</Link>
              <Link href={'/signup'} className='btn-link'>Sign up</Link>
            </div>
            <div className='col-6 text-end'>
              <button type="submit" className='btn btn-primary col-4'>Login</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
)}

export default LoginComp;
