import { FC } from 'react';
import { Button, ButtonColor } from 'components/button';
import { TextField } from 'components/text-field';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import cn from 'classnames';
import { useAuth } from '../hooks/use-auth';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from '../../utils/validation';
import { RouterPaths } from '../../app.types';
import styles from './form.module.pcss';

export const RegisterForm: FC = ({ ...props }) => {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FieldValues> = ({
    email,
    login,
    first_name,
    second_name,
    phone,
    password,
  }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    signUp({ first_name, second_name, login, email, password, phone });
    reset();
  };

  return (
    <form
      id="register-form"
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <TextField
        placeholder="Почта"
        type="email"
        key="email"
        {...register('email', {
          required: 'Обязательное поле',
          validate: validateEmail,
        })}
        error={errors.email?.message as string}
      />
      <TextField
        placeholder="Логин"
        type="text"
        key="login"
        {...register('login', {
          required: 'Обязательное поле',
          validate: validateLogin,
        })}
        error={errors.login?.message as string}
      />
      <TextField
        placeholder="Имя"
        type="text"
        key="first_name"
        {...register('first_name', {
          required: 'Обязательное поле',
          validate: validateName,
        })}
        error={errors.first_name?.message as string}
      />
      <TextField
        placeholder="Фамилия"
        type="text"
        key="second_name"
        {...register('second_name', {
          required: 'Обязательное поле',
          validate: validateName,
        })}
        error={errors.second_name?.message as string}
      />
      <TextField
        placeholder="Телефон"
        type="telephone"
        key="phone"
        {...register('phone', {
          required: 'Обязательное поле',
          validate: validatePhone,
        })}
        error={errors.phone?.message as string}
      />
      <TextField
        placeholder="Пароль"
        type="password"
        key="password"
        {...register('password', {
          required: 'Обязательное поле',
          validate: validatePassword,
        })}
        error={errors.password?.message as string}
      />
      <TextField
        placeholder="Пароль (ещё раз)"
        type="password"
        key="confirm_password"
        {...register('confirm_password', {
          required: 'Обязательное поле',
          validate: (value = '') => {
            if (getValues('password') !== value) {
              return 'Пароли не совпадают';
            }
            return true;
          },
        })}
        error={errors.confirm_password?.message as string}
      />
      <Button size="large" color={ButtonColor.GRADIENT} type="submit">
        регистрация
      </Button>
      <Link to={RouterPaths.LOGIN} className={cn(styles.link, 'text-main')}>
        Уже есть аккаунт? Войти
      </Link>
    </form>
  );
};
