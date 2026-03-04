import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const INSTITUTION_ROLE = 5;

export default function InstitutionRoute() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated || !user) return <Navigate to='/login' replace />;

  if (user.role !== INSTITUTION_ROLE) return <Navigate to='/' replace />;

  return <Outlet />;
}
