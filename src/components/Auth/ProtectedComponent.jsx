import { Navigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../../contexts/AuthContext';
import { useContext, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, checkIsLoggedIn } = useContext(AuthContext);
  // console.log("isLoggedIn", isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;