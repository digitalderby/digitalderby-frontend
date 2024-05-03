import { Navigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../../contexts/AuthContext';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute
