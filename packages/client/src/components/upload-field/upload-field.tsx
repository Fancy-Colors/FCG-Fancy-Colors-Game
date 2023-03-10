import { Button } from 'components/button';
import { ChangeEventHandler, FC, useRef } from 'react';
import styles from './upload-field.module.pcss';

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  hint?: JSX.Element | string;
  children: JSX.Element | string;
} & JSX.IntrinsicElements['input'];

export const UploadField: FC<Props> = ({
  onChange,
  children,
  hint,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={styles.uploadField}>
      <input
        ref={inputRef}
        onChange={onChange}
        className="u-visually-hidden"
        type="file"
        {...props}
      />
      <Button onClick={handleClick} className={styles.button} type="button">
        {children}
      </Button>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
};
