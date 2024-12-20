import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { CART_API, FORGOT_PASSWORD, USER_LOGIN } from '../../../endpoints'
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../interceptors/axios.interceptor';
import { ErrorMessage } from '@hookform/error-message';

const ForgotPasswordComp: FC = () => {
  const [wrongCredentialsError, setWrongCredentialsError] = useState(false);
  const [passResetLinkSent, setPassResetLinkSent] = useState(false);
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
      url: FORGOT_PASSWORD,
      data: data,
    }).then((res:any) => {
      if(res.data.type === 'success'){
        setPassResetLinkSent(true);
      }
    }).catch((err) => {
      setWrongCredentialsError(true);
    }) ;
  } 

  return (
    <div className='page-content'>
      <div className='row justify-content-center px-3'>
        <h2 className='mb-4 text-center'>Forgot Password</h2>
        { wrongCredentialsError &&
          <div className='mb-3 text-center'>
            <p className='text-danger'>User doesn&apos;t Exist!</p>
          </div>
        }
        { passResetLinkSent &&
          <div className='mb-3 text-center'>
            <p className='text-success'><strong>Password reset email sent, check your inbox.</strong></p>
          </div>
        }
        {!passResetLinkSent &&
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className='col-lg-5 col-md-6 col-12'>
            <div className='mb-4'>
              <input type="text"  {...register('user_email', {required: 'Required', pattern: {value: /^\S+@\S+\.\S+$/, message: 'invalid email'}})} placeholder='Enter Email' className='form-control' />
              <ErrorMessage errors={errors} name="user_email" as={<small className="text-small text-danger"></small>} />
            </div>
            <div className='row mb-3'>
              <div className='col-12 text-end'>
                <button type="submit" className='btn btn-primary col-4'>Submit</button>
              </div>
            </div>
          </form>
        }
      </div>
      <ToastContainer />
    </div>
)}

export default ForgotPasswordComp;
