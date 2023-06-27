import { useContext } from "react";
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../App";

const useAuth = () => {
  const { user } = useContext(UserContext);
  
  return user.loggedIn; // Ensure that user object exists and loggedIn is true
};

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();

  console.log('isAuth:', isAuth)
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
