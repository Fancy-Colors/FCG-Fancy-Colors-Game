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

export enum RouterPaths {
  MAIN = '/',
  HOW_TO = '/how-to',
  REGISTER = '/sign-up',
  LOGIN = '/login',
  PROFILE = '/profile',
  GAME = '/game',
  LEADERBOARD = '/leaderboard',
  FORUM = '/forum',
  NEW_THREAD = '/forum/new',
  ERROR_500 = '/500',
  ERROR_404 = '/404',
}

// если у страницы есть дочерний роут - не забудьте при верстке указать компонент <Outlet />
// Тестовая страница пусть остается пока не будут добавлены все страницы

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getCurrentUser() })}
    >
      <Route path={RouterPaths.MAIN} element={<TestPage text="Главная" />}>
        <Route
          path={RouterPaths.HOW_TO}
          element={<TestPage text='Модалка "Как играть"' />}
        />
      </Route>
      <Route
        path={RouterPaths.REGISTER}
        element={<TestPage text="Регистрация" />}
      />
      <Route path={RouterPaths.LOGIN} element={<TestPage text="Логин" />} />

      <Route element={<ProtectedRoutes />}>
        <Route path={RouterPaths.PROFILE} element={<Profile />} />
        <Route
          path={`${RouterPaths.GAME}/:id`}
          element={<TestPage text="Страница игры" />}
        />
        <Route
          path={RouterPaths.LEADERBOARD}
          element={<TestPage text="Лидерборд" />}
        />
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
