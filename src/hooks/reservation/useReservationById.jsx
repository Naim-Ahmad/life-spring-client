import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";
import useUser from "../users/useUser";

export default function useReservationById() {

    const {data:user} = useUser()
    // console.log(user?._id)
  
    const axiosSecure = useAxiosSecure();
    const [reservations, setReservations] = useState([])
  
    const { data, status, isPending, refetch } = useQuery({
      queryKey: ["getReservationByEmail"],
      queryFn: async () => {
        if (user) {
          const res = await axiosSecure.get(`/reservations/${user?._id}`);
          return res.data;
        }
      },
    });
  
    useEffect(()=>{
      if(status === 'success'){
        setReservations(data)
      }
    },[status, data])

    return {reservations, isPending, refetch, setReservations}
}