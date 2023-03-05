import { FC } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { RegisterForm } from '../../components/form';
import cn from 'classnames';
import styles from './register-login.module.pcss';

export const RegisterPage: FC = () => {
  return (
    <main className={cn(styles.main, 'w-6')}>
      <div className={styles.content}>
        <div>
          <Logo width="100%" height="100%" fill="#6644ec" />
        </div>
        <RegisterForm />
      </div>
    </main>
  );
};
