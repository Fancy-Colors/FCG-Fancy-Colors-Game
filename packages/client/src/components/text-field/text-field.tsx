import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './text-field.module.pcss';

type Props = {
  error?: string;
} & JSX.IntrinsicElements['input'];

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ error, ...props }, ref) => {
    return (
      <>
        <input className={styles.textField} ref={ref} {...props} />
        {error && <p className={cn(styles.error, 'text-caption')}>{error}</p>}
      </>
    );
  }
);

// Необходимо т.к компонент объявлен анонимной функцией
TextField.displayName = 'TextField';
