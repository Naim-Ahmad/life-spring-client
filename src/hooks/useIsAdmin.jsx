import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

export default function useIsAdmin() {

    const axiosSecure = useAxiosSecure()

    const {user} = useAuth()

    const {data:isAdmin, status, isLoading} = useQuery({
        queryKey: ['isAdmin'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/isAdmin?email=${user?.email}`)
            return res.data;
        }
    })


    return {isAdmin, status, isLoading}
}