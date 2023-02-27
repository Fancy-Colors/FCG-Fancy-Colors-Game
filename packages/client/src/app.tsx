import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TestPage } from './pages/test';

// если у страницы есть дочерний роут - не забудьте при верстке указать компонент <Outlet />

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<TestPage text="Главная" />}>
            <Route
              path="howto"
              element={<TestPage text='Модалка "Как играть"' />}
            />
          </Route>
          <Route path="register" element={<TestPage text="Регистрация" />} />
          <Route path="login" element={<TestPage text="Логин" />} />
          <Route path="profile" element={<TestPage text="Профиль" />} />
          <Route path=":id" element={<TestPage text="Страница игры" />} />
          <Route path="leaders" element={<TestPage text="Лидерборд" />} />
          <Route path="forum" element={<TestPage text="Форум" />}>
            <Route
              path="forum/create"
              element={<TestPage text='Модалка "Создать тему"' />}
            />
          </Route>
          <Route path="forum/:id" element={<TestPage text="Тема форума" />} />
          <Route path="error" element={<TestPage text="Ошибка 500" />} />
          <Route path="*" element={<TestPage text="Нет такой страницы" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
