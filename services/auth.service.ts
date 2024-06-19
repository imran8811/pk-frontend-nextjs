"use client";
import { USER_LOGOUT } from "../endpoints";
import axiosInstance from "../interceptors/axios.interceptor";

export class AuthService {
  constructor() { }

  public getUserSessionData() {
    if (typeof localStorage !== 'undefined') {
      let userData = localStorage.getItem('userData');
      userData = userData? JSON.parse(userData) : '';
      return userData;
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

export const getUserSessionData = AuthService.prototype.getUserSessionData;
export const UserLogout = AuthService.prototype.userLogout;
