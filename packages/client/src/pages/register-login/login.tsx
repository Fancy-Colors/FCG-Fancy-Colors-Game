import { FC } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { LoginForm } from 'components/form';
import cn from 'classnames';
import styles from './register-login.module.pcss';

export const LoginPage: FC = () => {
  return (
    <main className="app">
      <div className={cn(styles.container, 'w-12')}>
        <div className={styles.panel}>
          <div className={cn(styles.content, 'u-fancy-scrollbar')}>
            <div className={styles.form}>
              <div>
                <div>
                  <Logo width="100%" height="100%" fill="#6644ec" />
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
