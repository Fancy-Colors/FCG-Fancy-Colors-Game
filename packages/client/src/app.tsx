import { AuthLayout, getCurrentUser } from 'components/auth-layout';
import {
  Route,
  defer,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { TestPage } from './pages/test';
import { ProtectedRoutes } from './utils/protected-routes';
import { Profile } from 'pages/profile';
import { MainPage } from './pages/main';
import { HowToModal } from './components/how-to-modal';
import { GamePage } from 'pages/game';
import { RouterPaths } from './app.types';
import { MainLayout } from 'components/main-layout';
import { Error404, Error500 } from 'pages/error';
import { Leaderboard } from 'pages/leaderboard';
import { ForumThread } from 'components/forum-thread';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getCurrentUser() })}
    >
      <Route
        path={RouterPaths.REGISTER}
        element={<TestPage text="Регистрация" />}
      />
      <Route path={RouterPaths.LOGIN} element={<TestPage text="Логин" />} />
      <Route element={<MainLayout />}>
        <Route path={RouterPaths.MAIN} element={<MainPage />}>
          <Route path={RouterPaths.HOW_TO} element={<HowToModal />} />
        </Route>
        <Route path={RouterPaths.LEADERBOARD} element={<Leaderboard />} />
        <Route path={RouterPaths.FORUM} element={<TestPage text="Форум" />}>
          <Route
            path={RouterPaths.NEW_THREAD}
            element={<TestPage text='Модалка "Создать тему"' />}
          />
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
