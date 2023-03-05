import { FC } from 'react';
import { Button, ButtonColor } from 'components/button';
import { TextField } from 'components/text-field';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import cn from 'classnames';
import { useAuth } from '../hooks/use-auth';
import { validateLogin, validatePassword } from '../../utils/validation';
import { RouterPaths } from '../../app.types';
import styles from './form.module.pcss';

const LOGIN_FIELDS = [
  {
    placeholder: 'Логин',
    name: 'login',
    type: 'text',
    validate: validateLogin,
  },
  {
    placeholder: 'Пароль',
    name: 'password',
    type: 'password',
    validate: validatePassword,
  },
];

export const LoginForm: FC = ({ ...props }) => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ login, password }) => {
    signIn(login, password);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...props}>
      {LOGIN_FIELDS.map((field) => (
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
        Вход
      </Button>
      <Link to={RouterPaths.REGISTER} className={cn(styles.link, 'text-main')}>
        Нет аккаунта? Зарегистрироваться
      </Link>
    </form>
  );
};
