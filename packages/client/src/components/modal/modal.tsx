import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { Icon } from '../icon';
import styles from './modal.module.pcss';

type Props = {
  children: JSX.Element | JSX.Element[] | string;
};

export const Modal: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Button color="icon" size="small" onClick={() => navigate(-1)}>
            <Icon size="xs" type="close" color="#6644EC" />
          </Button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
