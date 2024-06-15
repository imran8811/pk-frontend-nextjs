"use client";
import { USER_LOGOUT } from "../endpoints";
import axiosInstance from "../interceptors/axios.interceptor";

export class AuthService {
  constructor() { }

  public checkUserSession() {
    let userData = localStorage.getItem('userData');
    userData = userData? JSON.parse(userData) : '';
    return userData;
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

export const CheckUserSession = AuthService.prototype.checkUserSession;
export const UserLogout = AuthService.prototype.userLogout;
