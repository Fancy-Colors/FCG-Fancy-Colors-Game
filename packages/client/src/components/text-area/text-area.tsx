import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './text-area.module.pcss';

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  JSX.IntrinsicElements['textarea']
>((props, ref) => (
  <div className={styles.wrapper}>
    <textarea
      className={cn(styles.textarea, 'u-fancy-scrollbar')}
      ref={ref}
      {...props}
    />
  </div>
));

TextArea.displayName = 'TextArea';
