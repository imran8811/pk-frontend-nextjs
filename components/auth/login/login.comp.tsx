import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { CART_API, USER_LOGIN } from '../../../endpoints'
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../interceptors/axios.interceptor';
import { ErrorMessage } from '@hookform/error-message';

const LoginComp: FC = () => {
  const [wrongCredentialsError, setWrongCredentialsError] = useState(false);
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
    setWrongCredentialsError(false);
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
        nextRoute? router.push(getQueryParamNextRoute): router.push('/')
      }
    }).catch((err) => {
      setWrongCredentialsError(true);
    }) ;
  } 

  return (
    <div className='page-content'>
      <div className='row justify-content-center px-3'>
        <h2 className='mb-4 text-center'>User Login</h2>
        { wrongCredentialsError &&
          <div className='mb-3 text-center'>
            <p className='text-danger'>Invalid Username/Password</p>
          </div>
        }
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className='col-lg-5 col-md-6 col-12'>
          <div className='mb-4'>
            <input type="text"  {...register('user_email', {required: "required", pattern: {value: /^\S+@\S+\.\S+$/, message: 'invalid email'}})} placeholder='Email' className='form-control' />
            <ErrorMessage errors={errors} name="user_email" as={<small className="text-small text-danger"></small>} />
          </div>
          <div className='mb-4'>
            <input type="password"  {...register('user_password', {required: 'required'})} placeholder='Password' className='form-control' />
          </div>
          <div className='row mb-3'>
            <div className='col-8'>
              <Link href={'/forgot-password'} className='btn-link mb-2'>Forgot Password</Link>
              <span className='divider px-2'>|</span> 
              <Link href={'/signup'} className='btn-link'>Sign up</Link>
            </div>
            <div className='col-4 text-end'>
              <button type="submit" className='btn btn-primary'>Login</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
)}

export default LoginComp;
