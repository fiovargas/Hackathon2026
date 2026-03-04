import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ADMIN_ROLE_ID = 1;

function AdminPermision() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated || !user) {
    return <Navigate to='/login' replace />;
  }

  if (user?.role !== ADMIN_ROLE_ID) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}

export default AdminPermision;
