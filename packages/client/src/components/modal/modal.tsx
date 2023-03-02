import { FC, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../button';
import { Icon } from '../icon';
import styles from './modal.module.pcss';

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  onClose: () => void;
};

const modalRoot = document.querySelector('#modals') as Element;

export const Modal: FC<Props> = ({ children, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscClick = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      {createPortal(
        <div
          role="button"
          tabIndex={0}
          className={styles.overlay}
          onClick={(e) => handleOverlayClick(e)}
          onKeyDown={(e) => handleEscClick(e)}
        >
          <div className={styles.modal}>
            <div className={styles.header}>
              <Button color="icon" size="small" onClick={onClose}>
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
