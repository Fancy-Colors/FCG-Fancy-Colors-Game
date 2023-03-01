import { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { RouterPaths } from '../app';

type Props = {
  text: string;
};

export const TestPage: FC<Props> = ({ text }) => {
  return (
    <>
      <div className="App">Вот тут будет жить ваше приложение :)</div>
      <div>{text}</div>
      <nav>
        <ul>
          <li>
            <Link to={RouterPaths.MAIN}>Главная</Link>
          </li>
          <li>
            <Link to={RouterPaths.HOW_TO}>Как играть</Link>
          </li>
          <li>
            <Link to={RouterPaths.REGISTER}>Регистрация</Link>
          </li>
          <li>
            <Link to={RouterPaths.LOGIN}>Логин</Link>
          </li>
          {/* если в protected-routes.tsx user={loggedIn:false} следующие страницы не появятся */}
          <li>
            <Link to={RouterPaths.FORUM}>Форум</Link>
          </li>
          <li>
            <Link to={RouterPaths.NEW_THREAD}>Создать тему</Link>
          </li>
          <li>
            <Link to={RouterPaths.THREAD}>Тема</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
