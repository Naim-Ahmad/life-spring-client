import axiosPublic from 'axios';

 const axios = axiosPublic.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL
 })

 export default axios;