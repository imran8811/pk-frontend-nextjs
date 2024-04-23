"use client";
import axios from "axios";
import { USER_LOGOUT } from "../endpoints";

export class AuthService {
  constructor() { }

  public checkUserSession() {
    let userData = localStorage.getItem('userData');
    userData = userData? JSON.parse(userData) : ''
    return userData;
  }

  public async userLogout(userId:string){
    const userLogout = await axios({
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
