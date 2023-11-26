import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../useAxiosSecure"

export default function useBookings() {

    const axiosSecure = useAxiosSecure()

    const {data, status, isPending} = useQuery({
        queryKey: ['allBookings'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/bookings')
            return res.data;
        }
    })

    return {data, status, isPending}
}