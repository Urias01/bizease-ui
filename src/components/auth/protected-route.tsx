
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoute {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRoute) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};
