import { AuthLayout, getCurrentUser } from 'components/auth-layout';
import {
  Route,
  defer,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { TestPage } from 'pages/test';
import { ProtectedRoutes } from 'utils/protected-routes';
import { Profile } from 'pages/profile';
import { MainPage } from 'pages/main';
import { LoginPage, RegisterPage } from 'pages/register-login';
import { Leaderboard } from 'pages/leaderboard';
import { HowToModal } from 'components/how-to-modal';
import { RouterPaths } from 'src/app.types';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getCurrentUser() })}
    >
      <Route path={RouterPaths.MAIN} element={<MainPage />}>
        <Route path={RouterPaths.HOW_TO} element={<HowToModal />} />
      </Route>
      <Route path={RouterPaths.REGISTER} element={<RegisterPage />} />
      <Route path={RouterPaths.LOGIN} element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path={RouterPaths.PROFILE} element={<Profile />} />
        <Route
          path={`${RouterPaths.GAME}/:id`}
          element={<TestPage text="Страница игры" />}
        />
        <Route path={RouterPaths.LEADERBOARD} element={<Leaderboard />} />
        <Route path={RouterPaths.FORUM} element={<TestPage text="Форум" />}>
          <Route
            path={RouterPaths.NEW_THREAD}
            element={<TestPage text='Модалка "Создать тему"' />}
          />
        </Route>
        <Route
          path={`${RouterPaths.FORUM}/:id`}
          element={<TestPage text="Тема форума" />}
        />
        <Route
          path={RouterPaths.ERROR_500}
          element={<TestPage text="Ошибка 500" />}
        />
        <Route
          path={RouterPaths.ERROR_404}
          element={<TestPage text="Ошибка 404" />}
        />
      </Route>
      <Route path="*" element={<TestPage text="Нет такой страницы" />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
