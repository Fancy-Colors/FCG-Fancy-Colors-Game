import cn from 'classnames';
import { Avatar } from 'components/avatar';
import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import { UploadField } from 'components/upload-field/upload-field';
import { type FormEvent } from 'react';
import styles from './profile.module.pcss';

const ProfileForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('submit profile form', event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.avatar}>
              <Avatar size="large" name="R" />
            </div>
          </div>
          <div className={styles.column}>
            <UploadField
              accept="image/*"
              name="avatar"
              hint="Размер файла не должен превышать 1 МБ"
            >
              Выбрать файл
            </UploadField>
          </div>
        </div>
        <h3 className={styles.title}>Изменить данные</h3>
        <div className={styles.row}>
          <div className={styles.column}>
            <TextField name="email" placeholder="Почта" />
            <TextField name="firstName" placeholder="Имя" />
            <TextField name="login" placeholder="Никнейм" />
          </div>
          <div className={styles.column}>
            <TextField name="login" placeholder="Логин" />
            <TextField name="secondName" placeholder="Фамилия" />
            <TextField name="phone" placeholder="Телефон" />
            <Button className={styles.submit}>Сохранить</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

const PasswordForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('submit password form', event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <h3 className={styles.title}>Изменить Пароль</h3>
        <div className={styles.row}>
          <div className={styles.column}>
            <TextField name="oldPassword" placeholder="Старый пароль" />
            <TextField name="newPassword" placeholder="Новый пароль" />
          </div>
          <div className={cn(styles.column, styles.offsetBefore)}>
            <TextField
              name="newPasswordRepeat"
              placeholder="Повторите новый пароль"
              error="error message"
            />
            <Button className={styles.submit}>Сохранить</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export const Profile = () => {
  return (
    <main className={styles.panel}>
      <ProfileForm />
      <PasswordForm />
    </main>
  );
};
