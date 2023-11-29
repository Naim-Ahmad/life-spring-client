import { useEffect, useState } from "react"
import useAxiosSecure from "../hooks/useAxiosSecure"

export default function useIsActive() {
    const axiosSecure = useAxiosSecure()
    const [isActive, setIsActive] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axiosSecure.get('isActive')
            .then(res => {
                setIsActive(res.data)
                console.log(res.data)
                setIsLoading(false)
            })
    }, [])
    
    return {isActive, isLoading}
}