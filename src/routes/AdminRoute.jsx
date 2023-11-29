import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import useAuth from "../hooks/useAuth"
import useIsAdmin from "../hooks/useIsAdmin"

export default function AdminRoute({ children }) {

    const { isAdmin } = useIsAdmin()
    const { user, loading } = useAuth()

    if (loading) return <LoadingSpinner />

    if (user && isAdmin) return children;

    return <Navigate to="/dashboard"/>

}