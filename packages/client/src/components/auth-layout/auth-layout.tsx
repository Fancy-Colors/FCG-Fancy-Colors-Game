import { AuthProvider } from 'components/hooks/use-auth';
import { useLoaderData, useOutlet } from 'react-router-dom';

type LoaderDataResponse = {
  user: Nullable<User>;
};

export const AuthLayout = () => {
  const outlet = useOutlet();
  const { user } = useLoaderData() as LoaderDataResponse;

  return <AuthProvider userData={user}>{outlet}</AuthProvider>;
};
