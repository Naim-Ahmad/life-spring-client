import { Typography } from "@material-tailwind/react"
import LoadingSpinner from "../components/LoadingSpinner"
import useIsActive from "../hooks/useIsActive"

export default function BlockedRoute({children}) {

    const {isActive, isLoading} = useIsActive()

    if(isLoading) return <LoadingSpinner/>
    // console.log(isActive)
    if(!isActive) return <div className="flex justify-center min-h-[70svh] items-center"><Typography variant="h3">You Are Blocked User You Can't Access Services</Typography></div>

    return children
}