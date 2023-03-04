import { FC } from 'react';
import { createPortal } from 'react-dom';
import { Button, ButtonColor } from '../button';
import { Icon } from '../icon';
import styles from './modal.module.pcss';

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  onClose: () => void;
};

const modalRoot = document.querySelector('#modals') as Element;

export const Modal: FC<Props> = ({ children, onClose }) => {
  return (
    <>
      {createPortal(
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <Button color={ButtonColor.ICON} size="small" onClick={onClose}>
                <Icon size="xs" type="close" color="#6644EC" />
              </Button>
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        </div>,
        modalRoot
      )}
    </>
  );
};
