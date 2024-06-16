import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { USER_LOGIN, WHOLESALE_SHOP } from '../../../endpoints'
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginComp: FC = () => {
  const router = useRouter();
  const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm();

  const onSubmit = async(data:any) => {
    await axios({
      method: 'post',
      url: USER_LOGIN,
      data: data,
    }).then((res:any) => {
      if(res.data.type === 'success'){
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('userData', JSON.stringify(res.data.data));
        }
        const nextRoute = sessionStorage.getItem('nextRoute');
        nextRoute? router.push(nextRoute): router.push(WHOLESALE_SHOP)
      }
    }).catch((err) => {
      toast.error(err.response.data.message);
    }) ;
  } 

  return (
    <div className='col-12 mt-5 mb-5'>
      <div className='row justify-content-center'>
        <h2 className='text-center mb-3'>User Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className='col-lg-4 col-md-6 col-12'>
          <div className='mb-3'>
            <input type="text"  {...register('email', {required: true})} placeholder='Email' className='form-control' />
          </div>
          <div className='mb-3'>
            <input type="password"  {...register('password', {required: true})} placeholder='Password' className='form-control' />
          </div>
          <div className='row mb-3'>
            <div className='col-6'>
              <Link href={'/forgot-password'} className='btn-link'>Forgot Password?</Link>
            </div>
            <div className='col-6 text-end'>
              <Link href={'/signup'} className='btn-link'>Sign up</Link>&nbsp;&nbsp;
              <button type="submit" className='btn btn-primary col-4'>Login</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
)}

export default LoginComp;
