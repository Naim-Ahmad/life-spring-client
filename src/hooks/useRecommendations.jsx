import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useRecommendations() {

    const axiosSecure = useAxiosSecure()

    const {data, status, isLoading, refetch} = useQuery({
        queryKey: ['allRecommendations'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/recommendations')
            return res.data;
        }
    })

    return {data, status, isLoading, refetch}
}