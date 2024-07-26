
import { useAppSelector } from "../../redux/hooks";
import { userCurrentToken } from "../../redux/feature/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = useAppSelector(userCurrentToken);
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}
