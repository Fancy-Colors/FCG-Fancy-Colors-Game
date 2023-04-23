import { FC, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from 'components/hooks';
import { deleteNotification } from 'src/services/app-slice';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import styles from './toast.module.pcss';

// eslint-disable-next-line unicorn/prefer-query-selector
const notificationRoot = document.getElementById(
  'notifications'
) as HTMLElement;

export const Toast: FC = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.app);

  const deleteToast = useCallback(
    (id: number) => {
      dispatch(deleteNotification(id));
    },
    [dispatch]
  );

  useEffect(() => {
    setTimeout(() => {
      if (notifications.length > 0) {
        deleteToast(notifications[0]?.id);
      }
    }, 3000);
  }, [deleteToast, notifications]);

  return (
    <>
      {createPortal(
        <div className={styles.container}>
          {notifications.map((toast) => (
            <div
              key={toast.id}
              className={cn(styles.toast, styles[toast.type])}
            >
              <div className={styles.content}>
                <div className={styles.image}>
                  <Icon type={toast.type} size="small" />
                </div>
                <p className={styles.text}>{toast.text}</p>
              </div>
              <Button
                color="ICON"
                onClick={() => deleteToast(toast.id)}
                className={styles.button}
              >
                <Icon type="close" size="xs" />
              </Button>
            </div>
          ))}
        </div>,
        notificationRoot
      )}
    </>
  );
};
