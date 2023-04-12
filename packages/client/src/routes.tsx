import { ProtectedRoutes } from 'utils/protected-routes';
import { MainLayout } from 'components/main-layout';
import { NewThreadModal } from 'components/modal-new-thread';
import { AuthLayout, getCurrentUser } from 'components/auth-layout';
import { RegisterPage, LoginPage } from 'pages/auth';
import { Error500, Error404 } from 'pages/error';
import { Forum } from 'pages/forum';
import { ForumThread } from 'pages/forum-thread';
import { GamePage } from 'pages/game';
import { Leaderboard } from 'pages/leaderboard';
import { MainPage } from 'pages/main';
import { Profile } from 'pages/profile';
import { createRoutesFromElements, defer, Route } from 'react-router-dom';
import { RouterPaths } from './app.types';
import { AppStore } from './store';

// Доступ к стору для лоадеров
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createRoutes = (store: AppStore) => {
  return createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={async ({ request }) => {
        const user = await getCurrentUser(request);
        return defer({
          user,
        });
      }}
    >
      <Route path={RouterPaths.REGISTER} element={<RegisterPage />} />
      <Route path={RouterPaths.LOGIN} element={<LoginPage />} />
      <Route
        element={<MainLayout />}
        loader={({ request }) => {
          const url = new URL(request.url);
          return url.searchParams.get('modal');
        }}
      >
        <Route path={RouterPaths.MAIN} element={<MainPage />} />
        <Route path={RouterPaths.LEADERBOARD} element={<Leaderboard />} />
        <Route path={RouterPaths.FORUM} element={<Forum />}>
          <Route path={RouterPaths.NEW_THREAD} element={<NewThreadModal />} />
        </Route>
        <Route path={`${RouterPaths.FORUM}/:id`} element={<ForumThread />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={RouterPaths.PROFILE} element={<Profile />} />
          <Route path={`${RouterPaths.GAME}/:id`} element={<GamePage />} />
        </Route>
      </Route>
      <Route path={RouterPaths.ERROR_500} element={<Error500 />} />
      <Route path={RouterPaths.ERROR_404} element={<Error404 />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  );
};
