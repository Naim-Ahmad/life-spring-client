import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../useAxiosSecure"

export default function useBanners(path) {

    const axiosSecure = useAxiosSecure()

   const getBanner =  async ()=>{
        const url = path ? path : '/banners'
        const res = await axiosSecure.get(url)
        return res.data;
    }

    const {data, isLoading, refetch} = useQuery({
        queryKey: ['allBanners', path],
        queryFn: getBanner
    })

    return  {data, isLoading, refetch}
}