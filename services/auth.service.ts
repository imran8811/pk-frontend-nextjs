"use client";
import { USER_LOGOUT } from "../endpoints";
import axiosInstance from "../interceptors/axios.interceptor";
import { IUser } from "../models/user.model";

export class AuthService {
  constructor() { }

  public checkUserSession(){
    if (typeof localStorage !== 'undefined') {
      let userData:IUser = JSON.parse(localStorage.getItem('userData')!);
      return userData?.token? true : false;
    }
  }
  
  public guestUserExist(){
    if(typeof localStorage !== 'undefined') {
      let userData:IUser = JSON.parse(localStorage.getItem('userData')!);
      return userData?.userType === 'guest'? true : false;
    }  
  }

  public getUserSessionData() {
    if (typeof localStorage !== 'undefined') {
      let userData = localStorage.getItem('userData');
      if(userData){
        return JSON.parse(userData);
      }
    }
  }

  public async userLogout(userId:string){
    const userLogout = await axiosInstance({
      method: 'post',
      url: USER_LOGOUT,
      data: {
        userId
      }
    })
    return userLogout? true: false;
  }
}

export const UserLogout = AuthService.prototype.userLogout;
export const getUserSessionData = AuthService.prototype.getUserSessionData;
export const checkUserSession = AuthService.prototype.checkUserSession;
export const guestUserExist = AuthService.prototype.guestUserExist;
