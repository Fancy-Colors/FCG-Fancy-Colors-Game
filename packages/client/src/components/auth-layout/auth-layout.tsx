import { authApi } from 'api/auth';
import { AuthProvider } from 'components/hooks/use-auth';
import { Suspense } from 'react';
import { Await, useLoaderData, useOutlet } from 'react-router-dom';
import { transformUser } from 'utils/api-transformers';
import { hasApiError } from 'utils/has-api-error';

export async function getCurrentUser() {
  try {
    const response = await authApi.me();

    if (!response || hasApiError(response)) {
      return null;
    }

    return transformUser(response);
  } catch {
    return null;
  }
}

const LoadingIndicator = () => <div>Загрузка...</div>;

type LoaderDataResponse = {
  userPromise: ReturnType<typeof getCurrentUser>;
};

export const AuthLayout = () => {
  const outlet = useOutlet();
  const { userPromise } = useLoaderData() as LoaderDataResponse;

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Await resolve={userPromise}>
        {(user) => <AuthProvider userData={user}>{outlet}</AuthProvider>}
      </Await>
    </Suspense>
  );
};
