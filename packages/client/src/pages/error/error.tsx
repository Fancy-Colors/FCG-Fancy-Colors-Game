import cn from 'classnames';
import { ButtonLink } from 'components/button';
import { ErrorStub, ErrorStubProps } from 'components/error-stub';
import { RouterPaths } from 'src/app.types';
import styles from './error.module.pcss';

export const ErrorPage = ({
  title,
  message,
}: Pick<ErrorStubProps, 'message' | 'title'>) => {
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.inner, 'u-page', 'u-container')}>
        <ErrorStub title={title} message={message}>
          <ButtonLink to={RouterPaths.MAIN}>Перейти на главную</ButtonLink>
        </ErrorStub>
      </div>
    </div>
  );
};

export const Error404 = () => {
  return (
    <ErrorPage
      title="404"
      message="Упс... Мы не можем найти страницу которую вы искали :("
    />
  );
};

export const Error500 = () => {
  return (
    <ErrorPage
      title="500"
      message="На сервере произошла непредвиденная ошибка :("
    />
  );
};
