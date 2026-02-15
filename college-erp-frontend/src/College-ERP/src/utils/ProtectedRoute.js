import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const role = localStorage.getItem("userRole");

  if (!role) {
    return <Navigate to="/" replace />;
  }

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
