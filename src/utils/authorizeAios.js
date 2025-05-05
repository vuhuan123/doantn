import axios from "axios"
import { toast } from "react-toastify"
import { interceptorLoadingElements } from "./fomater"
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