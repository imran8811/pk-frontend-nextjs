import axios from "axios";

import { baseRoute } from "../endpoints";

const refreshToken = async () => {

}

const axiosInstance = axios.create({
  baseURL: baseRoute
})

axiosInstance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if(userData){
      const token = userData.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return {
      ...config
    };
  },
  (error) => {
    return Promise.reject(error);
  });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {

    }
    return Promise.reject(error)
  }
)

export default axiosInstance;