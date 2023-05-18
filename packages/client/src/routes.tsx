import { ProtectedRoutes } from 'utils/protected-routes';
import { MainLayout } from 'components/main-layout';
import { AuthLayout } from 'components/auth-layout';
import { RegisterPage, LoginPage } from 'pages/auth';
import { Error500, Error404 } from 'pages/error';
import { Forum } from 'pages/forum';
import { ForumThread } from 'pages/forum-thread';
import { GamePage } from 'pages/game';
import { Leaderboard } from 'pages/leaderboard';
import { MainPage } from 'pages/main';
import { Profile } from 'pages/profile';
import { createRoutesFromElements, json, Route } from 'react-router-dom';
import { RouterPaths } from './app.types';
import { AppStore } from './store';
import { YandexOAuth } from 'components/yandex-oauth';
import { levelLoader } from 'utils/level-loader';
import { UserDTO } from 'api/types';
import { transformUser } from 'utils/api-transformers';

export const createRoutes = (store: AppStore, user?: Nullable<UserDTO>) => {
  return createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => json({ user: user ? transformUser(user) : null })}
    >
      <Route element={<YandexOAuth />}>
        <Route element={<ProtectedRoutes reverse />}>
          <Route path={RouterPaths.REGISTER} element={<RegisterPage />} />
          <Route path={RouterPaths.LOGIN} element={<LoginPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path={RouterPaths.MAIN}
            element={<MainPage />}
            loader={() => levelLoader(store)}
          />
          <Route element={<ProtectedRoutes />}>
            <Route path={RouterPaths.LEADERBOARD} element={<Leaderboard />} />
            <Route path={RouterPaths.FORUM} element={<Forum />} />
            <Route
              path={`${RouterPaths.FORUM}/:id`}
              element={<ForumThread />}
            />
            <Route path={RouterPaths.PROFILE} element={<Profile />} />
            <Route path={`${RouterPaths.GAME}/:id`} element={<GamePage />} />
          </Route>
        </Route>
        <Route path={RouterPaths.ERROR_500} element={<Error500 />} />
        <Route path={RouterPaths.ERROR_404} element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Route>
  );
};
