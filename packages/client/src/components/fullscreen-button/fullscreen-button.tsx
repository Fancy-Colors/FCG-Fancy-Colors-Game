import { FC, KeyboardEventHandler } from 'react';
import { useFullScreen } from 'components/hooks';
import { Button } from 'components/button';
import styles from './fullscreen-button.module.pcss';

export const FullScreenButton: FC<{ fsRef: Nullable<HTMLElement> }> = ({
  fsRef,
}) => {
  const { isFullScreen, toggleFullScreen } = useFullScreen(fsRef);

  const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'f') {
      toggleFullScreen();
    }
  };

  return (
    <Button
      onClick={toggleFullScreen}
      onKeyDown={handleKeyDown}
      className={styles.button}
    >
      {isFullScreen ? 'свернуть' : 'развернуть на весь экран'}
    </Button>
  );
};
