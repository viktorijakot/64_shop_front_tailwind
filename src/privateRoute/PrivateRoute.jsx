import { Navigate } from "react-router-dom";
import { useAuthContext } from "../store/AuthCtxProvider";

export default function PrivateRoute({ children }) {
  const { isUserLoggedIn } = useAuthContext();

  return isUserLoggedIn ? children : <Navigate to="/" />;
}
