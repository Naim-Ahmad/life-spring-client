import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) return;

  if (user) return children;

  return <Navigate state={pathname} to="/logIn" />;
}
