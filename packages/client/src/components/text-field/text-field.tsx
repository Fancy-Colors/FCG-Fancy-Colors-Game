import { forwardRef } from 'react';
import styles from './text-field.module.pcss';

type Props = {
  error?: string;
} & JSX.IntrinsicElements['input'];

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ error, ...props }, ref) => {
    return (
      <div className={styles.textField}>
        <input className={styles.input} ref={ref} {...props} />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);

// Необходимо т.к компонент объявлен анонимной функцией
TextField.displayName = 'TextField';
