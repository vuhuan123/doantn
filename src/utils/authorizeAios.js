import axios from "axios"
import { toast } from "react-toastify"
import { interceptorLoadingElements } from "./fomater"
import { refreshTokenAPI } from "../apis"
import { logoutUserAPI } from '../redux/user/userSlice'


// inject store
let axiosReduxStore 
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}



// Create an instance of axios with a custom config
let authorizedAxiosInstance = axios.create()
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10 // Set timeout to 10 minutes
authorizedAxiosInstance.defaults.withCredentials = true // Include credentials in requests

//Cau hinh Interceptor cho axios
// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use((config) => {
    // Do something before request is sent
    // ky thuat block spam click
    interceptorLoadingElements(true)
    return config;
  },  (error)=> {
    // Do something with request error
    return Promise.reject(error);
  });

// khoi tao 1 cai promise cho viec refresh token
// Muc dich tao Promise nay de khi nao goi api refresh token xong thif ms retry lai nhieu api bi loi truoc do
let refreshTokenPromise = null
// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use((response)=> {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    interceptorLoadingElements(false)

    return response;
  },(error)=> {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    interceptorLoadingElements(false)
    // Quan trong: Xu ly refreshToken tu dong
    // TH1 neu nhan ma 404 tu BE, thif goi api dang xuat luon
    if(error.response?.status === 401){
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }
    // TH2 neu nhan ma 410 tu BE, thif goi api refresh token
    const originalRequests = error.config
    
    if(error.response?.status === 410 && originalRequests){
      // kiem tra xem da co promise refresh token chua
      if(!refreshTokenPromise){
        // neu chua co promise refresh token, thif khoi tao promise moi
        refreshTokenPromise = refreshTokenAPI()
        .then((data)=>{
          return data?.accessToken
        })
        .catch((_error)=>{
          axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(()=>{
          refreshTokenPromise = null
        })
      }
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken)=>{
        return authorizedAxiosInstance(originalRequests)
      })
    }


    let errorMessage = error.message
    if(error.response?.data.message){
        errorMessage = error.response.data.message
    }
    if(error.response?.status !== 410){
        toast.error(errorMessage)
    }
    return Promise.reject(error);
  });

export default authorizedAxiosInstance