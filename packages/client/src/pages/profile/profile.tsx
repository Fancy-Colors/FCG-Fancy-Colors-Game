import cn from 'classnames';
import { Avatar } from 'components/avatar';
import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import { UploadField } from 'components/upload-field';
import { ChangeEventHandler } from 'react';
import styles from './profile.module.pcss';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from 'utils/validation';
import { useAuth } from 'components/hooks/use-auth';
import { userApi } from 'api/user';
import { transformUser } from 'utils/api-transformers';
import { hasApiError } from 'utils/has-api-error';

type ProfileFormFields = {
  email: string;
  firstName: string;
  login: string;
  displayName: string;
  secondName: string;
  phone: string;
};

const requiredFieldMessage = 'Это обязательное поле';

const ProfileForm = () => {
  const { setUser, user } = useAuth();
  const { id, avatar, ...defaultValues } = user as User;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormFields>({ defaultValues });

  // TODO: Перенести бизнес логику в сервисы/контроллеры
  const onSubmit: SubmitHandler<ProfileFormFields> = async (formValues) => {
    /* eslint-disable @typescript-eslint/naming-convention */
    const response = await userApi.update({
      first_name: formValues.firstName,
      second_name: formValues.secondName,
      phone: formValues.phone,
      email: formValues.email,
      display_name: formValues.displayName,
      login: formValues.login,
    });
    /* eslint-enable */

    if (hasApiError(response)) {
      // TODO: Сделать оповещение об ошибках через toast
      return console.error(response.reason);
    }

    setUser(transformUser(response));
  };

  const onAvatarChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      // TODO: Сделать валидацию размера файла 1MB
      const formData = new FormData();
      formData.append('avatar', files[0]);
      const response = await userApi.updateAvatar(formData);

      if (hasApiError(response)) {
        return console.error(response.reason);
      }

      setUser(transformUser(response));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.avatar}>
              <Avatar avatar={avatar} size="large" name={user!.login} />
            </div>
          </div>
          <div className={styles.column}>
            <UploadField
              accept="image/*"
              name="avatar"
              onChange={onAvatarChange}
              hint="Размер файла не должен превышать 1 МБ"
            >
              Выбрать файл
            </UploadField>
          </div>
        </div>
        <h3 className={styles.title}>Изменить данные</h3>
        <div className={styles.row}>
          <div className={styles.column}>
            <TextField
              placeholder="Почта"
              error={errors.email?.message}
              {...register('email', {
                required: { value: true, message: requiredFieldMessage },
                validate: validateEmail,
              })}
            />
            <TextField
              placeholder="Имя"
              error={errors.firstName?.message}
              {...register('firstName', {
                required: { value: true, message: requiredFieldMessage },
                validate: validateName,
              })}
            />
            <TextField
              placeholder="Никнейм"
              error={errors.displayName?.message}
              {...register('displayName', {
                required: { value: true, message: requiredFieldMessage },
                validate: validateLogin,
              })}
            />
          </div>
          <div className={styles.column}>
            <TextField
              placeholder="Логин"
              error={errors.login?.message}
              {...register('login', {
                required: { value: true, message: requiredFieldMessage },
                validate: validateLogin,
              })}
            />
            <TextField
              placeholder="Фамилия"
              error={errors.secondName?.message}
              {...register('secondName', {
                required: { value: true, message: requiredFieldMessage },
                validate: validateName,
              })}
            />
            <TextField
              placeholder="Телефон"
              error={errors.phone?.message}
              {...register('phone', {
                required: { value: true, message: requiredFieldMessage },
                validate: validatePhone,
              })}
            />
            <Button disabled={!isDirty} type="submit" className={styles.submit}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

type PasswordFormFields = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

const PasswordForm = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    getValues,
    reset,
  } = useForm<PasswordFormFields>();

  const onSubmit: SubmitHandler<PasswordFormFields> = async ({
    oldPassword,
    newPassword,
  }) => {
    const response = await userApi.updatePassword({ oldPassword, newPassword });

    if (hasApiError(response)) {
      return console.error(response.reason);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <h3 className={styles.title}>Изменить Пароль</h3>
        <div className={styles.row}>
          <div className={styles.column}>
            <TextField
              placeholder="Старый пароль"
              type="password"
              error={errors.oldPassword?.message}
              {...register('oldPassword', {
                required: { value: true, message: requiredFieldMessage },
              })}
            />
            <TextField
              placeholder="Новый пароль"
              type="password"
              error={errors.newPassword?.message}
              {...register('newPassword', {
                required: { value: true, message: requiredFieldMessage },
                validate: validatePassword,
              })}
            />
          </div>
          <div className={cn(styles.column, styles.offsetBefore)}>
            <TextField
              placeholder="Повторите новый пароль"
              type="password"
              error={errors.newPasswordRepeat?.message}
              {...register('newPasswordRepeat', {
                required: { value: true, message: requiredFieldMessage },
                validate: (value) => {
                  const { newPassword } = getValues();

                  if (value !== newPassword) {
                    return 'Пароли не совпадают';
                  }

                  return true;
                },
              })}
            />
            <Button disabled={!isDirty} type="submit" className={styles.submit}>
              Сохранить
            </Button>
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
