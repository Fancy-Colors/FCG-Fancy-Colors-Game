import { useAuth } from 'components/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';
import { RouterPaths } from 'src/app.types';

export const ProtectedRoutes = ({ reverse = false }: { reverse?: boolean }) => {
  const { user } = useAuth();
  const redirectTo = reverse ? RouterPaths.MAIN : RouterPaths.LOGIN;
  if (reverse) return user ? <Navigate replace to={redirectTo} /> : <Outlet />;
  return user ? <Outlet /> : <Navigate replace to={redirectTo} />;
};
