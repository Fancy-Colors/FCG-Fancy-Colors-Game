import { FC } from 'react';
import { Button, ButtonColor } from 'components/button';
import { TextField } from 'components/text-field';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, FieldValues, Validate } from 'react-hook-form';
import cn from 'classnames';
import styles from './form.module.pcss';

type Props = {
  linkTo: string;
  buttonTitle: string;
  linkTitle: string;
  fields: Array<Field>;
  onClick?: () => void;
  onSubmit: SubmitHandler<FieldValues>;
};

type Field = {
  placeholder: string;
  name: string;
  type: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  validate: Validate<any, FieldValues>;
} & JSX.IntrinsicElements['input'];

export const Form: FC<Props> = ({
  linkTo,
  buttonTitle,
  linkTitle,
  fields,
  onClick,
  onSubmit,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...props}>
      {fields.map((field) => (
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
      <Button
        size="large"
        color={ButtonColor.GRADIENT}
        type="submit"
        onClick={onClick}
      >
        {buttonTitle}
      </Button>
      <Link to={linkTo}>
        <p className={cn(styles.link, 'text-main')}>{linkTitle}</p>
      </Link>
    </form>
  );
};
