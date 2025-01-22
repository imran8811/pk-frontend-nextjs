import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { USER_SIGN_UP } from '../../../endpoints';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { IUser } from '../../../models';
import { ErrorMessage } from '@hookform/error-message';
import { COUNTRY_CODES } from '../../../constants';

const SignupComp: FC = () => {
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userExistError, setUserExistError] = useState(false);
  const [callingCode, setCallingCode] = useState(0);
  const router = useRouter();
  const { register, setError, handleSubmit, getValues, watch, formState: { errors }} = useForm();

  // const getUserLocation = async() => {
  //   const getIP = await axios.get('https://api.ipify.org').then(res => res);
  //   const res = await axios({
  //     method: 'get',
  //     url: 'https://api.ipregistry.co/',
  //   }).then((res:any) => {
  //     console.log(res.data);
  //     setCallingCode(res.data.country.calling_code);
  //   }).catch((err) => {
  //     console.log(err)
  //   });
  // }

  const onSubmit = async(data:any) => {
    setConfirmPasswordError(false);
    setUserExistError(false);
    if(checkConfirmPassword(data)) {
      delete data.confirmPassword
      const res = await axios({
        method: 'post',
        url: USER_SIGN_UP,
        data: data,
      }).then((res:any) => {
        console.log(res.data);
        if(res.data.type === 'success'){
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('userData', JSON.stringify(res.data.data));
          }
          toast.success(res.data.message);
          setTimeout(() => {
            router.push('/login');
          }, 3000)
        } else if(res.data.type === 'error' && res.data.errorType === '11440'){
          setUserExistError(true)
        }
      }).catch((err) => {
        toast.error(err.response.data.message)
      });
    } else {
      setConfirmPasswordError(true);
    }
  } 

  const checkConfirmPassword = (data) => {
    const password = data.user_password;
    const confirmPassword = data.confirmPassword;
    if(password === confirmPassword){
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className='page-content'>
      <div className='row justify-content-center px-3'>
        <h2 className='text-center mb-4'>Business Registration</h2>
        { userExistError &&
          <div className='mb-3 text-center'>
            <p className='text-danger'>User already Exists</p>
            <p>Try <Link href={'/login'}>Login</Link> or <Link href={'/forgot-password'}>Forgot Password</Link></p>
          </div>
        }
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className='col-lg-5 col-md-6 col-12'>
          <div className='mb-4'>
            <input type="text"  {...register('business_name', {required: 'Required'})} placeholder='Business Name' className='form-control' />
            <ErrorMessage errors={errors} name="business_name" as={<small className="text-small text-danger"></small>} />
          </div>
          <div className='mb-4'>
            <select className='select-input' {...register('business_type', {required: 'Required'})}>
              <option value=''>Business Type</option>
              <option value='retailer'>Retailer</option>
              <option value='wholesaler'>Wholesaler</option>
            </select>
            <ErrorMessage errors={errors} name="business_type" as={<small className="text-small text-danger"></small>} />
          </div>
          <div className='mb-4'>
            <input type="text"  {...register('user_email', {required: 'Required', pattern: {value: /^\S+@\S+\.\S+$/, message: 'invalid email'}})} placeholder='Email' className='form-control' />
            <ErrorMessage errors={errors} name="user_email" as={<small className="text-small text-danger"></small>} />
          </div>
          <div className='mb-4'>
            <input type="password" {...register('user_password', {required: 'Required', minLength: {value:10, message: 'Min 10 characters'}})} placeholder='Password' className='form-control' />
            <ErrorMessage errors={errors} name="user_password" as={<small className="text-small text-danger"></small>} />
          </div>
          <div className='mb-4'>
            <input type="password"  {...register('confirmPassword', {required: true})} placeholder='Confirm Password' className='form-control' />
            { confirmPasswordError &&
              <span className='text-small text-danger'>Confirm password mismatch</span>
            }
          </div>
          <div className='mb-4 pb-4 border-bottom'>
            <div className='row'>
              <div className='col-4'>
                <select className='select-input' {...register('calling_code', {required: true})}>
                  {COUNTRY_CODES.map((code, index) => {
                    return (
                      <option value={code} key={index}>{code}</option>
                    )
                  })}
                </select>
                <ErrorMessage errors={errors} name="contact_no" as={<small className="text-small text-danger"></small>} />
              </div>
              <div className='col-8'>
                <input type="number"  {...register('contact_no', {required: 'Required', minLength:{value: 8, message: 'Min length 8 numbers'}})} placeholder='Contact No' className='form-control' />
              </div>
            </div>
          </div>
          <div className='d-flex mb-3'>
            <div className='col-6'>
              <Link href={'/login'} className='btn-link col-6'>Login</Link>
            </div>
            <div className='col-6 text-end'>
              <button type="submit" className='btn btn-primary'>Signup</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignupComp;
