import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }

  // Not Logged In
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role Mismatch
  if (role && user.role !== role) {
    switch (user.role) {
      case "buyer":
        return <Navigate to="/buyer" replace />;

      case "seller":
        return <Navigate to="/seller" replace />;

      case "delivery":
        return <Navigate to="/delivery" replace />;

      case "admin":
        return <Navigate to="/admin" replace />;

      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;