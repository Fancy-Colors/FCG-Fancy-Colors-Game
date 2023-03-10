import { FC } from 'react';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { LoginForm, RegisterForm } from 'components/form';
import cn from 'classnames';
import styles from './auth.module.pcss';

type Props = {
  children: JSX.Element;
};

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <main className="app">
      <div className={cn(styles.container, 'w-12')}>
        <div className={styles.panel}>
          <div className={cn(styles.content, 'u-fancy-scrollbar')}>
            <div className={styles.form}>
              <div>
                <Logo width="100%" fill="#6644ec" />
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const LoginPage: FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export const RegisterPage: FC = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
