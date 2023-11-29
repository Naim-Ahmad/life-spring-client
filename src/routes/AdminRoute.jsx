import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import useAuth from "../hooks/useAuth"
import useIsAdmin from "../hooks/useIsAdmin"

export default function AdminRoute({ children }) {

    const { isAdmin, isLoading } = useIsAdmin()
    const { user, loading } = useAuth()

    if (loading || isLoading) return <LoadingSpinner />

    if (user && isAdmin) return children;
    console.log(isAdmin)

    return <Navigate to="/dashboard"/>

}