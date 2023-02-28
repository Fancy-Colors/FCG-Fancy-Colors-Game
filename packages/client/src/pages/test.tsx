import { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Paths } from '../app';

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
          <Link to={Paths.main}>
            <li>Главная</li>
          </Link>
          <Link to={Paths.howto}>
            <li>Как играть</li>
          </Link>
          <Link to={Paths.register}>
            <li>Регистрация</li>
          </Link>
          <Link to={Paths.login}>
            <li>Логин</li>
          </Link>
          {/* если в protected-routes.tsx user={loggedIn:false} следующие страницы не появятся */}
          <Link to={Paths.forum}>
            <li>Форум</li>
          </Link>
          <Link to={Paths.new_thread}>
            <li>Создать тему</li>
          </Link>
          <Link to={Paths.thread}>
            <li>Тема</li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
