import { useAuth } from 'components/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';
import { RouterPaths } from '../app';

export const ProtectedRoutes = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={RouterPaths.LOGIN} />;
};
