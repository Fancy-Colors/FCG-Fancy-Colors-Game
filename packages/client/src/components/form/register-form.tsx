import { FC } from 'react';
import { Button, ButtonColor } from 'components/button';
import { TextField } from 'components/text-field';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import cn from 'classnames';
import { useAuth } from 'components/hooks/use-auth';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from 'utils/validation';
import { RouterPaths } from 'src/app.types';
import styles from './form.module.pcss';

type Props = JSX.IntrinsicElements['form'];

export const RegisterForm: FC<Props> = (props) => {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...props}>
      <TextField
        placeholder="Почта"
        type="email"
        {...register('email', {
          required: 'Обязательное поле',
          validate: validateEmail,
        })}
        error={errors.email?.message as string}
      />
      <TextField
        placeholder="Логин"
        type="text"
        {...register('login', {
          required: 'Обязательное поле',
          validate: validateLogin,
        })}
        error={errors.login?.message as string}
      />
      <TextField
        placeholder="Имя"
        type="text"
        {...register('first_name', {
          required: 'Обязательное поле',
          validate: validateName,
        })}
        error={errors.first_name?.message as string}
      />
      <TextField
        placeholder="Фамилия"
        type="text"
        {...register('second_name', {
          required: 'Обязательное поле',
          validate: validateName,
        })}
        error={errors.second_name?.message as string}
      />
      <TextField
        placeholder="Телефон"
        type="telephone"
        {...register('phone', {
          required: 'Обязательное поле',
          validate: validatePhone,
        })}
        error={errors.phone?.message as string}
      />
      <TextField
        placeholder="Пароль"
        type="password"
        {...register('password', {
          required: 'Обязательное поле',
          validate: validatePassword,
        })}
        error={errors.password?.message as string}
      />
      <TextField
        placeholder="Пароль (ещё раз)"
        type="password"
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
