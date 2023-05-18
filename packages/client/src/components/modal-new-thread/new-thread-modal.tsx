import { SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from 'components/modal';
import { TextField } from 'components/text-field';
import { TextArea } from 'components/text-area';
import { Button } from 'components/button';
import { isEmpty, max } from 'utils/validation';
import styles from './new-thread-modal.module.pcss';
import { setNotification } from 'src/services/app-slice';
import { useAppDispatch, useAuth } from 'components/hooks';
import { forumApi } from 'api/forum';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'src/app.types';

const MAX_POST_LENGTH = 1000;

type FormField = {
  title: string;
  firstMessage: string;
};

type Props = {
  onClose: () => void;
  show: boolean;
};

export const NewThreadModal = ({ onClose, show }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormField>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormField> = async (formValues) => {
    try {
      const newThread = await forumApi.createThread({
        createdBy: user!.id,
        ...formValues,
      });
      navigate(`${RouterPaths.FORUM}/${newThread.id}`);
      dispatch(setNotification({ type: 'success', text: 'Тема опубликована' }));
      onClose();
      reset();
    } catch {
      dispatch(
        setNotification({ type: 'error', text: 'Не удалось создать тему' })
      );
    }
  };

  if (!show) return null;

  return (
    <Modal onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder="Название темы"
          type="text"
          {...register('title', {
            required: 'Обязательное поле',
          })}
          error={errors.title?.message}
        />
        <TextArea
          placeholder="Сообщение"
          rows={13}
          {...register('firstMessage', {
            validate: (value = '') => {
              return !(isEmpty(value) || !max(value, MAX_POST_LENGTH));
            },
          })}
          error={errors.firstMessage?.message}
        />
        <Button type="submit" className={styles.button}>
          Создать тему
        </Button>
      </form>
    </Modal>
  );
};
