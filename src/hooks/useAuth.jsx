import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"

export default function useAuth() {
    const authInfo = useContext(AuthContext)
    return authInfo
}