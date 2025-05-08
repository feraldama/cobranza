import { useAuth } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import "./PrivateRoute.css";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Cargando...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
