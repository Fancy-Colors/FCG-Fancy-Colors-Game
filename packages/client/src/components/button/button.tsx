import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './button.module.pcss';

enum ButtonColor {
  gradient = 'gradient',
  colored = 'colored',
  light = 'light',
  icon = 'icon',
}

const ButtonColorChoice = {
  [ButtonColor.gradient]: styles.gradient,
  [ButtonColor.colored]: styles.colored,
  [ButtonColor.light]: styles.light,
  [ButtonColor.icon]: styles.icon,
};

type ButtonProps = {
  link?: string;
  color?: keyof typeof ButtonColor;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children: JSX.Element | JSX.Element[] | string;
} & JSX.IntrinsicElements['button'];

export const Button: FC<ButtonProps> = ({
  link,
  color = ButtonColor.colored,
  size = 'medium',
  className,
  children,
  ...props
}) => {
  const cnButton = cn(
    className,
    styles.button,
    styles[size],
    ButtonColorChoice[color] ?? styles.colored
  );

  return (
    <>
      {link ? (
        <Link to={link} className={cnButton}>
          <span className={styles.btn}>{children}</span>
        </Link>
      ) : (
        <button className={cnButton} {...props}>
          <span className={styles.btn}>{children}</span>
        </button>
      )}
    </>
  );
};
