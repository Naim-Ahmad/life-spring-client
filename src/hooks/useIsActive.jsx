import { useEffect, useState } from "react"
import useAxiosSecure from "../hooks/useAxiosSecure"
import useAuth from "./useAuth"

export default function useIsActive() {
    const axiosSecure = useAxiosSecure()
    const [isActive, setIsActive] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const { user, loading } = useAuth()

    useEffect(() => {
        if (!loading && user) {
            axiosSecure.get(`/isActive?email=${user?.email}`)
                .then(res => {
                    setIsActive(res.data)
                    // console.log(res.data)
                })
            setIsLoading(false)
        }

    }, [user, axiosSecure, loading])

    return { isActive, isLoading }
}