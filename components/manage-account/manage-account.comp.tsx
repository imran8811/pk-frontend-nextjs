import { FC, useEffect } from "react";
import useState from 'react-usestateref'
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import { Modal } from "antd";
import { ErrorMessage } from "@hookform/error-message";

import axiosInstance from "../../interceptors/axios.interceptor";
import { USER_ADDRESS, GET_USER_ACCOUNT, GET_USER_ADDRESS_BY_ID } from "../../endpoints";
import { checkUserSession } from "../../services/auth.service";
import { IUser, IUserAddress } from "../../models";
import { ALLOWED_COUNTRIES } from "../../constants";

const ManageAccountComp: FC = () => {
  const [userAccount, setUserAccount, userAccountRef] = useState<IUser>();
  const [userAddresses, setUserAddresses, userAddressesRef] = useState<IUserAddress[]>();
  const [isCreateAddressModalOpen, setIsCreateAddressModalOpen] = useState(false);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [isDeleteAddressModalOpen, setIsDeleteAddressModalOpen] = useState(false);
  const [addressId, setAddressId, addressIdRef] = useState('');

  const router = useRouter();
  const { register, handleSubmit, getValues, setValue, reset, formState: { errors }} = useForm({ criteriaMode: 'all'});
  let userData;

  if (typeof localStorage !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('userData')!);
  }

  useEffect(() => {
    if(!checkUserSession()){
      router.push('/login?next=wholesale-shop')
    }
    getUserAccount();
    getUserAddresses();
  }, [])

  const createAddressModalOpen = () => {
    setIsCreateAddressModalOpen(true);
  };

  const deleteAddressModalOpen = (addressId:string) => {
    setIsDeleteAddressModalOpen(true);
    setAddressId(addressId);
  };

  const handleCancel = () => {
    setIsCreateAddressModalOpen(false);
    setIsEditAddressModalOpen(false);
    setIsDeleteAddressModalOpen(false);
    reset();
  };

  const createNewUserAddress = async(data:any) => {
    await axiosInstance({
      method: 'post',
      url: USER_ADDRESS,
      data: {
        ...data,
        userId: userData.userId
      },
    }).then((res:any) => {
      if(res.data.type === 'success'){
        toast.success(res.data.message);
        setIsCreateAddressModalOpen(false);
        getUserAddresses();
        reset();
      }
    }).catch((err) => {
      toast.error(err.response.data.message);
    }) ;
  } 

  const updateUserAddress = async(data:any) => {
    await axiosInstance({
      method: 'put',
      url: USER_ADDRESS,
      data: {
        ...data,
        userId: userData.userId
      },
    }).then((res:any) => {
      if(res.data.type === 'success'){
        toast.success(res.data.message);
        setIsEditAddressModalOpen(false);
        getUserAddresses();
        reset();
      }
    }).catch((err) => {
      toast.error(err.response.data.message);
    }) ;
  } 

  const deleteUserAddress = async(addressId:string) => {
    const userId = userData?.userId;
    await axiosInstance({
      method: 'delete',
      url: `${GET_USER_ADDRESS_BY_ID}/${userId}/${addressId}`,
    }).then((res:any) => {
      if(res.data.type === 'success'){
        toast.success(res.data.message);
        setIsDeleteAddressModalOpen(false);
        getUserAddresses();
      }
    }).catch((err) => {
      toast.error(err.response.data.message);
    }) ;
  } 

  const getAddressbyId = async(id:string) => {
    await axiosInstance({
      method: 'get',
      url: `${GET_USER_ADDRESS_BY_ID}/${id}`
    }).then((res:any) => {
      if(res.data.type === 'success'){
        setValue('country', res.data.data[0].country);
        setValue('state', res.data.data[0].state);
        setValue('city', res.data.data[0].city);
        setValue('area', res.data.data[0].area);
        setValue('postalCode', res.data.data[0].postalCode);
        setValue('addressType', res.data.data[0].addressType);
        setValue('addressId', res.data.data[0]._id);
        setIsEditAddressModalOpen(true);
      }
    }).catch((err) => {
      toast.error(err.response.data.message);
    }) ;
  } 

  const getUserAccount = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${GET_USER_ACCOUNT}/${userData.userId}`
    }).then(res => {
      setUserAccount(res.data.data);
    })
  }

  const getUserAddresses = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${USER_ADDRESS}/${userData.userId}`
    }).then(res => {
      setUserAddresses(res.data.data);
    })
  }

  return (
    <>
      <h1 className="text-center mt-3 mb-4">Manage your account</h1>
      {userAccount && 
        <>
          <div className="row justify-content-center">
            <div className="col-md-3 p-5 m-3 shodow-rounded">
              <h2 className="mb-4">Personal profile</h2>
              <ul>
                <li className="row mb-3">
                  <span className="col-6">Business Name: &nbsp;&nbsp;</span>
                  <span className="col-6">{userAccount.businessName}</span>
                </li>
                <li className="row mb-3">
                  <span className="col-6">Email: &nbsp;&nbsp;</span>
                  <span className="col-6">{userAccount.email}</span>
                </li>
                <li className="row mb-3">
                  <span className="col-6">Contact No: &nbsp;&nbsp;</span>
                  <span className="col-6">{userAccount.contactNo}</span>
                </li>
                <li className="row mb-3">
                  <span className="col-6">Member Since: &nbsp;&nbsp;</span>
                  <span className="col-6">{dayjs(userAccount.createdAt).format('DD-MMM-YYYY')}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-8 p-5 m-3 shodow-rounded">
              <h2>Address Book</h2>
              <div className="row justify-content-start">
                {userAddresses?.map((address, index) => {
                  return (
                    <div className="col-md-5 p-4 m-3 shodow-rounded mb-3" key={index}>
                      <h2 className="text-capitalize text-primary mb-3">{address.addressType}</h2>
                      <address>
                        {address.area+', '+address.city+', '+address.country+', '+address.postalCode }
                      </address>
                      <ul>
                        <li><button className="btn btn-link" onClick={() => {getAddressbyId(address._id)}}>Edit</button></li>
                        <li><button className="btn btn-link" onClick={() => {deleteAddressModalOpen(address._id)}}>Delete</button></li>
                      </ul>
                    </div>
                  )
                })}
              </div>
              <div className="col-12 mt-3 text-center">
                <button className="btn btn-link" onClick={() => {createAddressModalOpen()}}>Add New Address</button>
              </div>
            </div>
          </div>
          <div className="row justify-centent-center">
            <div className="col-11 m-3 shodow-rounded p-3">
              <h2>Recent Orders</h2>

            </div>
          </div>
        </>
      }
      <Modal open={isCreateAddressModalOpen} footer={null} onCancel={handleCancel}>
        <div className='row justify-content-center'>
          <h2 className='text-center mb-3'>Enter Address Details</h2>
          <form onSubmit={handleSubmit(createNewUserAddress)} autoComplete="off" className='col-12'>
            <div className='mb-3'>
              <select className="select-input" {...register('country', {required: 'Required'})}>
                <option selected>Select Country</option>
                {ALLOWED_COUNTRIES.map((country, index) => {
                  return(
                    <option value={country.toLocaleLowerCase()} key={index}>{country}</option>
                  )
                })}
              </select>
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('state', {required: 'Required'})} placeholder='State' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('city', {required: 'Required'})} placeholder='City' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('area', {required: 'Required'})} placeholder='Street/Area/Town' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('postalCode', {required: 'Required'})} placeholder='Postal Code' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <select className="select-input" {...register('addressType', {required: 'Required'})}>
                <option>Select address type</option>
                <option value={'home'}>Home</option>
                <option value={'work'}>Work</option>
              </select>
              <ErrorMessage errors={errors} name="addressType" as={<small className="text-danger"></small>} />
            </div>
            <div className="mb-3 text-end">
              <button type="submit" className='btn btn-primary col-4'>Create</button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal open={isDeleteAddressModalOpen} onCancel={handleCancel} cancelText={'No'} okText={'Yes'} onOk={() => deleteUserAddress(addressIdRef.current)} closeIcon={false}>
        <p className="text-danger">Are you sure you want to delete selected address?</p>
      </Modal>
      <Modal open={isEditAddressModalOpen} footer={null} onCancel={handleCancel}>
        <div className='row justify-content-center'>
          <h2 className='text-center mb-3'>Edit Address Details</h2>
          <form onSubmit={handleSubmit(updateUserAddress)} autoComplete="off" className='col-12'>
            <div className='mb-3'>
              <select className="select-input" {...register('country', {required: 'Required'})}>
                <option selected>Select Country</option>
                {ALLOWED_COUNTRIES.map((country, index) => {
                  return(
                    <option value={country.toLocaleLowerCase()} key={index}>{country}</option>
                  )
                })}
              </select>
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('state', {required: 'Required'})} placeholder='State' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('city', {required: 'Required'})} placeholder='City' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('area', {required: 'Required'})} placeholder='Street/Area/Town' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('postalCode', {required: 'Required'})} placeholder='Postal Code' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <select className="select-input" {...register('addressType', {required: 'Required'})}>
                <option>Select address type</option>
                <option value={'home'}>Home</option>
                <option value={'work'}>Work</option>
              </select>
              <ErrorMessage errors={errors} name="addressType" as={<small className="text-danger"></small>} />
            </div>
            <div className="mb-3 text-end">
              <button type="submit" className='btn btn-primary col-4'>Update</button>
            </div>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default ManageAccountComp;