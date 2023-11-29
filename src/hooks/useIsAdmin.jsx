import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"

export default function useIsAdmin() {

    const axiosSecure = useAxiosSecure()

    const {data:isAdmin, status, isLoading} = useQuery({
        queryKey: ['isAdmin'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/isAdmin')
            return res.data;
        }
    })


    return {isAdmin, status, isLoading}
}