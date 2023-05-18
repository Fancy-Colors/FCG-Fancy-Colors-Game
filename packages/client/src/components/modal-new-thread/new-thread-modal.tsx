import { SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from 'components/modal';
import { TextField } from 'components/text-field';
import { TextArea } from 'components/text-area';
import { Button } from 'components/button';
import { isEmpty, max } from 'utils/validation';
import styles from './new-thread-modal.module.pcss';

const MAX_POST_LENGTH = 1000;

type FormField = {
  name: string;
  message: string;
};

type Props = {
  onClose: () => void;
  show: boolean;
};

export const NewThreadModal = ({ onClose, show }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormField> = () => {
    // API форума. Cоздание темы
  };

  if (!show) return null;

  return (
    <Modal onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder="Название темы"
          type="text"
          {...register('name', {
            required: 'Обязательное поле',
          })}
          error={errors.name?.message}
        />
        <TextArea
          placeholder="Сообщение"
          rows={13}
          {...register('message', {
            validate: (value = '') => {
              return !(isEmpty(value) || !max(value, MAX_POST_LENGTH));
            },
          })}
        />
        <Button type="submit" className={styles.button}>
          Создать тему
        </Button>
      </form>
    </Modal>
  );
};
