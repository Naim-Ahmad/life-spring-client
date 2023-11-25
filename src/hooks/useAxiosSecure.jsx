import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    withCredentials: true,
})

export default function useAxiosSecure() {

    axiosInstance.interceptors.response.use((response)=> {
        return response
    }, (error)=>{
        console.log(error)
        return Promise.reject(error)
    })

    return axiosInstance;
}