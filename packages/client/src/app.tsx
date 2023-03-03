import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TestPage } from './pages/test';
import { ProtectedRoutes } from './utils/protected-routes';
import { MainPage } from './pages/main';
import { HowToModal } from './components/how-to-modal';
import { RouterPaths } from './app.types';
// если у страницы есть дочерний роут - не забудьте при верстке указать компонент <Outlet />
// Тестовая страница пусть остается пока не будут добавлены все страницы

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path={RouterPaths.MAIN} element={<MainPage />}>
            <Route path={RouterPaths.HOW_TO} element={<HowToModal />} />
          </Route>
          <Route
            path={RouterPaths.REGISTER}
            element={<TestPage text="Регистрация" />}
          />
          <Route path={RouterPaths.LOGIN} element={<TestPage text="Логин" />} />

          <Route
            path={`${RouterPaths.GAME}/:id`}
            element={<TestPage text="Страница игры" />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route
              path={RouterPaths.PROFILE}
              element={<TestPage text="Профиль" />}
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
