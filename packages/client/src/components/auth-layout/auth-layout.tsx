import { authApi } from 'api/auth';
import { AuthProvider } from 'components/hooks/use-auth';
import { useLoaderData, useOutlet } from 'react-router-dom';
import { transformUser } from 'utils/api-transformers';
import { hasApiError } from 'utils/has-api-error';

export async function getCurrentUser(request: Request) {
  try {
    const response = await authApi.me(request);

    if (!response || hasApiError(response)) {
      return null;
    }

    return transformUser(response);
  } catch {
    return null;
  }
}

type LoaderDataResponse = {
  user: Awaited<ReturnType<typeof getCurrentUser>>;
};

export const AuthLayout = () => {
  const outlet = useOutlet();
  const { user } = useLoaderData() as LoaderDataResponse;

  return <AuthProvider userData={user}>{outlet}</AuthProvider>;
};
