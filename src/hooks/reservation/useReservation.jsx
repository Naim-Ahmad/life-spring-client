import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../useAxiosSecure"

export default function useReservation() {
    // console.log(path)

    const axiosSecure = useAxiosSecure()

    const {data, status, isPending} = useQuery({
        queryKey: ['allReservations'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/reservations')
            return res.data;
        }
    })

    return {data, status, isPending}
}