
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { LINK_VALIDITY, RESET_PASSWORD } from '../../../endpoints'
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage } from '@hookform/error-message';
import Link from 'next/link';

const ResetPasswordComp: FC = () => {
  const [linkValidityError, setLinkValidityError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordResetConfirmation, setPasswordResetConfirmation] = useState(false);
  const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm();
  const searchParams = useSearchParams();

  useEffect(()=> {
    checkLinkExpiry(searchParams.get('token'));
  }, [])

  const checkConfirmPassword = (data) => {
    const password = data.user_password;
    const confirmPassword = data.confirmPassword;
    if(password === confirmPassword){
      return true;
    } else {
      return false;
    }
  }
  
  const checkLinkExpiry = async(token:any) => {
    await axios({
      method: 'post',
      url: LINK_VALIDITY,
      data: {token},
    }).then((res:any) => {
      if(res.data.type === 'success'){
        setLinkValidityError(false);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('user_email', res.data.user_email);
        }
      }
    }).catch((err) => {
      setLinkValidityError(true);
    });
  }

  const onSubmit = async(data:any) => {
    setConfirmPasswordError(false);
    if(checkConfirmPassword(data)) {
      await axios({
        method: 'post',
        url: RESET_PASSWORD,
        data: {...data, 'user_email': localStorage.getItem('user_email')}
      }).then((res:any) => {
        if(res.data.type === 'success'){
          setPasswordResetConfirmation(true);
        }
      }).catch((err) => {
        console.log(err);
        toast.error(err.code);
      });
    } else {
      setConfirmPasswordError(true);
    }
  } 

  return (
    <div className='page-content'>
      <div className='row justify-content-center px-3'>
        <h2 className='mb-4 text-center'>Reset Password</h2>
        { linkValidityError &&
          <div className='mb-3 text-center'>
            <p className='text-danger'>Reset Password Link Expired!</p>
          </div>
        }
        { passwordResetConfirmation &&
          <div className='mb-3 text-center'>
            <p><strong>Password has been reset, <Link href={'login'}>login now</Link></strong></p>
          </div>
        }
        {!linkValidityError && !passwordResetConfirmation &&
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className='col-lg-5 col-md-6 col-12'>
              <div className='mb-4'>
              <input type="password" {...register('user_password', {required: 'Required', minLength: {value:10, message: 'Min 10 characters'}})} placeholder='Password' className='form-control' />
              <ErrorMessage errors={errors} name="user_password" as={<small className="text-small text-danger"></small>} />
            </div>
            <div className='mb-4'>
            <input type="password"  {...register('confirmPassword', {required: 'Required'})} placeholder='Confirm Password' className='form-control' />
              { confirmPasswordError &&
                <span className='text-small text-danger'>Confirm password mismatch</span>
              }
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

export default ResetPasswordComp;
