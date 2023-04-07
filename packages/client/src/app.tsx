import { AuthLayout, getCurrentUser } from 'components/auth-layout';
import {
  Route,
  defer,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { ProtectedRoutes } from 'utils/protected-routes';
import { Profile } from 'pages/profile';
import { MainPage } from 'pages/main';
import { GamePage } from 'pages/game';
import { RouterPaths } from './app.types';
import { LoginPage, RegisterPage } from 'pages/auth';
import { MainLayout } from 'components/main-layout';
import { Error404, Error500 } from 'pages/error';
import { Leaderboard } from 'pages/leaderboard';
import { ForumThread } from 'pages/forum-thread';
import { NewThreadModal } from 'components/modal-new-thread';
import { Forum } from 'pages/forum';
import { gameApi } from './api';
import { setLevels } from './services/level-slice';
import { store } from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getCurrentUser() })}
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
        <Route
          path={RouterPaths.MAIN}
          element={<MainPage />}
          loader={async () => {
            if (store.getState().level.levels.length === 0) {
              const res = await gameApi.readGames();
              store.dispatch(setLevels(res));
            }
            return null;
          }}
        />
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
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
