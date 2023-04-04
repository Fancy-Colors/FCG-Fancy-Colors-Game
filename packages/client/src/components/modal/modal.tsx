/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { IsomorphicPortal } from 'components/isomorphic-portal';
import { FC, useEffect } from 'react';
import { Button } from '../button';
import { Icon } from '../icon';
import styles from './modal.module.pcss';

interface KeyboardEvent {
  key: string;
}

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  onClose: () => void;
};

export const Modal: FC<Props> = ({ children, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscClick = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscClick);
    return () => window.removeEventListener('keydown', handleEscClick);
  }, [onClose]);

  return (
    <IsomorphicPortal selector="#modals">
      <div className={styles.overlay} onClick={(e) => handleOverlayClick(e)}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <Button color="ICON" size="small" onClick={onClose}>
              <Icon size="xs" type="close" color="#6644EC" />
            </Button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </IsomorphicPortal>
  );
};
