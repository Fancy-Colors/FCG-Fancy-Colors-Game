import { FC, useEffect } from 'react';
import { useOutlet, useSearchParams } from 'react-router-dom';
import { oAuthApi } from 'api/oauth';
import { hasApiError } from 'utils/has-api-error';
import { useAuth } from 'components/hooks';
import { authApi } from 'src/api';
import { transformUser } from 'utils/api-transformers';

export const YandexOAuth: FC = () => {
  const outlet = useOutlet();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setUser, user } = useAuth();

  useEffect(() => {
    if (!user && searchParams.has('code')) {
      const signIn = async () => {
        const redirect = import.meta.env.VITE_YANDEX_OAUTH_REDIRECT_URI;
        const oAuthResponse = await oAuthApi.signIn({
          code: searchParams.get('code') as string,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          redirect_uri: redirect,
        });
        if (hasApiError(oAuthResponse)) {
          return;
        }
        const response = await authApi.me();
        if (!response || hasApiError(response)) {
          return;
        }
        setUser(transformUser(response));
        setSearchParams({});
      };
      signIn();
    }
  }, [user, searchParams, setUser, setSearchParams]);

  return <>{outlet}</>;
};
