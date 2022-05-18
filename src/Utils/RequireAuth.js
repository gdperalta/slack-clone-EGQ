import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ isLoggedIn, children }) => {
  let auth = JSON.parse(sessionStorage.getItem("auth"));
  let location = useLocation();

  if (!auth && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default RequireAuth;
