import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) return <LoadingSpinner/>;

  if (user) return children;

  return <Navigate state={pathname} to="/logIn" />;
}
