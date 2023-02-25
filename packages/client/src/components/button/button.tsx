import styles from './button.module.pcss';
import cn from 'classnames';

enum ButtonColor {
  gradient = 'gradient',
  colored = 'colored',
  light = 'light',
}

const ButtonColorChoice = {
  [ButtonColor.gradient]: styles.gradient,
  [ButtonColor.colored]: styles.colored,
  [ButtonColor.light]: styles.light,
};

type ButtonProps = {
  type?: 'button' | 'submit';
  link?: string;
  title: string;
  color?: keyof typeof ButtonColor;
  size?: 's' | 'm' | 'l';
  className?: string;
  isLink?: boolean;
  onClick?: () => void;
};

export const Button = ({
  type = 'submit',
  link,
  title = '',
  color = ButtonColor.colored,
  size = 'm',
  className,
  isLink = false,
  onClick,
}: ButtonProps) => {
  const cnButton = cn(
    className,
    styles.button,
    styles[size],
    ButtonColorChoice[color] ?? styles.colored
  );

  return (
    <>
      {isLink ? (
        <a href={link} className={cnButton}>
          <span className={styles.btn}>{title}</span>
        </a>
      ) : (
        <button type={type} className={cnButton} onClick={onClick}>
          <span className={styles.btn}>{title}</span>
        </button>
      )}
    </>
  );
};
