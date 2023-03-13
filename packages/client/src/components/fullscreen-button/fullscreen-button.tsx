import { FC, useEffect } from 'react';
import { useFullScreen } from 'components/hooks';
import { Button } from 'components/button';
import styles from './fullscreen-button.module.pcss';

export const FullScreenButton: FC<{ fsRef: Nullable<HTMLElement> }> = ({
  fsRef,
}) => {
  const { isFullScreen, toggleFullScreen } = useFullScreen(fsRef);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'f' || e.key === 'F') {
        toggleFullScreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFullScreen]);

  return (
    <Button onClick={toggleFullScreen} className={styles.button}>
      {isFullScreen ? 'свернуть' : 'развернуть на весь экран'}
    </Button>
  );
};
