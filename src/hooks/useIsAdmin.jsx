import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import useAxiosSecure from "./useAxiosSecure"

export default function useIsAdmin() {

    const [isAdmin, setIsAdmin] = useState(null)
    const axiosSecure = useAxiosSecure()

    const {data, status, isLoading} = useQuery({
        queryKey: ['isAdmin'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/isAdmin')
            return res.data;
        }
    })

    useEffect(()=>{
        if(status=== 'success'){
            setIsAdmin(data)
        }
    }, [status, data])

    return {isAdmin, status, isLoading}
}