import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export function withAuth(Component) {
  function WithAuth(props) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
      return (
        <div className="flex justify-center items-center py-32 text-gray-500">
          Checking your session…
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Component {...props} />;
  }

  WithAuth.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;
  return WithAuth;
}
