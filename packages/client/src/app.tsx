import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TestPage } from './pages/test';
import { ProtectedRoutes } from './utils/protected-routes';

export enum Paths {
  main = '/',
  howto = '/how-to',
  register = '/sign-up',
  login = '/login',
  profile = '/profile',
  game = '/game/:id',
  leaderboard = '/leaderboard',
  forum = '/forum',
  new_thread = '/forum/new',
  thread = '/forum/:id',
  error500 = '/500',
  error404 = '/404',
}

// если у страницы есть дочерний роут - не забудьте при верстке указать компонент <Outlet />
// Тестовая страница пусть остается пока не будут добавлены все страницы

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={Paths.main} element={<TestPage text="Главная" />}>
            <Route
              path={Paths.howto}
              element={<TestPage text='Модалка "Как играть"' />}
            />
          </Route>
          <Route
            path={Paths.register}
            element={<TestPage text="Регистрация" />}
          />
          <Route path={Paths.login} element={<TestPage text="Логин" />} />

          <Route element={<ProtectedRoutes />}>
            <Route path={Paths.profile} element={<TestPage text="Профиль" />} />
            <Route
              path={Paths.game}
              element={<TestPage text="Страница игры" />}
            />
            <Route
              path={Paths.leaderboard}
              element={<TestPage text="Лидерборд" />}
            />
            <Route path={Paths.forum} element={<TestPage text="Форум" />}>
              <Route
                path={Paths.new_thread}
                element={<TestPage text='Модалка "Создать тему"' />}
              />
            </Route>
            <Route
              path={Paths.thread}
              element={<TestPage text="Тема форума" />}
            />
            <Route
              path={Paths.error500}
              element={<TestPage text="Ошибка 500" />}
            />
            <Route
              path={Paths.error404}
              element={<TestPage text="Ошибка 404" />}
            />
          </Route>

          <Route path="*" element={<TestPage text="Нет такой страницы" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
