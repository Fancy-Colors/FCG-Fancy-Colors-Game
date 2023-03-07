import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './text-field.module.pcss';

type Props = {
  error?: string;
} & JSX.IntrinsicElements['input'];

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ error, ...props }, ref) => {
    return (
      <div className={styles.textField}>
        <input className={styles.input} ref={ref} {...props} />
        {error && <p className={cn(styles.error, 'text-caption')}>{error}</p>}
      </div>
    );
  }
);

// Необходимо т.к компонент объявлен анонимной функцией
TextField.displayName = 'TextField';
