import { authApi, SignUpPayload } from 'api/auth';
import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'src/app.types';
import { transformUser } from 'utils/api-transformers';
import { hasApiError } from 'utils/has-api-error';
import { useAppDispatch } from './use-app-dispatch';
import { setNotification } from 'src/services/app-slice';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (login: string, password: string) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
  userData,
}: {
  children: React.ReactNode | null;
  userData: User | null;
}) {
  const [user, setUser] = useState<User | null>(userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signIn = async (login: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const signInResponse = await authApi.signIn({ login, password });

      if (hasApiError(signInResponse)) {
        throw new Error(signInResponse.reason);
      }

      const userResponse = await authApi.me();

      if (hasApiError(userResponse)) {
        throw new Error(userResponse.reason);
      }

      setUser(transformUser(userResponse));
      navigate(RouterPaths.MAIN);
    } catch (err: unknown) {
      dispatch(
        setNotification({ type: 'error', text: 'Не удалось получить данные' })
      );
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (payload: SignUpPayload) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.signUp(payload);

      if (hasApiError(response)) {
        throw new Error(response.reason);
      }

      const userResponse = await authApi.me();

      if (hasApiError(userResponse)) {
        throw new Error(userResponse.reason);
      }

      setUser(transformUser(userResponse));
      navigate(RouterPaths.MAIN);
    } catch (err: unknown) {
      dispatch(
        setNotification({ type: 'error', text: 'Не удалось получить данные' })
      );
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    navigate(RouterPaths.LOGIN);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      signIn,
      signUp,
      logout,
      setUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
