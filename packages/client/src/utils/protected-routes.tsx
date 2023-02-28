import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from '../app';

const useAuth = () => {
  // потом брать из стора
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

export const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={Paths.login} />;
};
