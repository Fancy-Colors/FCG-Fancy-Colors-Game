import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './text-area.module.pcss';

type Props = {
  error?: string;
} & JSX.IntrinsicElements['textarea'];

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ error, ...props }, ref) => (
    <div className={styles.wrapper}>
      <textarea
        className={cn(styles.textarea, 'u-fancy-scrollbar')}
        ref={ref}
        {...props}
      />
      {error && <p className={cn(styles.error, 'text-caption')}>{error}</p>}
    </div>
  )
);

TextArea.displayName = 'TextArea';
