import { FC } from 'react';
import { Button, ButtonColor } from 'components/button';
import { TextField } from 'components/text-field';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import cn from 'classnames';
import { useAuth } from 'components/hooks/use-auth';
import { validateLogin, validatePassword } from 'utils/validation';
import { RouterPaths } from 'src/app.types';
import styles from './form.module.pcss';

type Props = JSX.IntrinsicElements['form'];

export const LoginForm: FC<Props> = (props) => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ login, password }) => {
    signIn(login, password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...props}>
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
        placeholder="Пароль"
        type="password"
        {...register('password', {
          required: 'Обязательное поле',
          validate: validatePassword,
        })}
        error={errors.password?.message as string}
      />
      <Button size="large" color={ButtonColor.GRADIENT} type="submit">
        Вход
      </Button>
      <Link to={RouterPaths.REGISTER} className={cn(styles.link, 'text-main')}>
        Нет аккаунта? Зарегистрироваться
      </Link>
    </form>
  );
};
