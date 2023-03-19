import { Button, ButtonColor } from 'components/button';
import { Icon } from 'components/icon';
import { TextArea } from 'components/text-area';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isEmpty, max } from 'utils/validation';
import styles from './message-composer.module.pcss';

const MAX_POST_LENGTH = 1000;

type MessageField = {
  message: string;
};

export const MessageComposer = () => {
  const { handleSubmit, reset, register } = useForm<MessageField>();

  const onSubmit: SubmitHandler<MessageField> = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.messageComposer}>
      <TextArea
        rows={6}
        {...register('message', {
          validate: (value = '') => {
            return !(isEmpty(value) || !max(value, MAX_POST_LENGTH));
          },
        })}
      />
      <div className={styles.actions}>
        <Button type="button" size="small" color={ButtonColor.ICON}>
          <Icon type="smile" size="large" color="var(--text-color-primary)" />
        </Button>
        <Button type="button" size="small" color={ButtonColor.ICON}>
          <Icon type="forum" size="large" color="var(--text-color-primary)" />
        </Button>
        <Button type="submit">Отправить</Button>
      </div>
    </form>
  );
};
