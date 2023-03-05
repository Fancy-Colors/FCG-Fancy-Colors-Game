import { FC } from 'react';
import { Button, ButtonColor } from 'components/button';
import { TextField } from 'components/text-field';
import { Link } from 'react-router-dom';
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form';
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

const registerFields = (getValues: UseFormGetValues<FieldValues>) => [
  {
    placeholder: 'Почта',
    name: 'email',
    type: 'email',
    validate: validateEmail,
  },
  {
    placeholder: 'Логин',
    name: 'login',
    type: 'text',
    validate: validateLogin,
  },
  {
    placeholder: 'Имя',
    name: 'first_name',
    type: 'text',
    validate: validateName,
  },
  {
    placeholder: 'Фамилия',
    name: 'second_name',
    type: 'text',
    validate: validateName,
  },
  {
    placeholder: 'Телефон',
    name: 'phone',
    type: 'telephone',
    validate: validatePhone,
  },
  {
    placeholder: 'Пароль',
    name: 'password',
    type: 'password',
    validate: validatePassword,
  },
  {
    placeholder: 'Пароль (ещё раз)',
    name: 'confirm_password',
    type: 'password',
    validate: (value = '') => {
      if (getValues('password') !== value) {
        return 'Пароли не совпадают';
      }

      return true;
    },
  },
];

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
      {registerFields(getValues).map((field) => (
        <TextField
          placeholder={field.placeholder}
          type={field.type}
          key={field.name}
          {...register(field.name, {
            required: 'Обязательное поле',
            validate: field.validate,
          })}
          error={errors[field.name]?.message as string}
        />
      ))}
      <Button size="large" color={ButtonColor.GRADIENT} type="submit">
        регистрация
      </Button>
      <Link to={RouterPaths.LOGIN} className={cn(styles.link, 'text-main')}>
        Уже есть аккаунт? Войти
      </Link>
    </form>
  );
};
