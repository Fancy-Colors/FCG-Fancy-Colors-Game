import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
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

type Props = {
  color?: keyof typeof ButtonColor;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children: JSX.Element | JSX.Element[] | string;
};

type ButtonAsLink = {
  to: string;
} & Props &
  LinkProps;

type ButtonAsButton = Props & JSX.IntrinsicElements['button'];

export const Button: FC<ButtonAsButton> = ({
  type = 'button',
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
    <button type={type} className={cnButton} {...props}>
      <span className={styles.btn}>{children}</span>
    </button>
  );
};

export const ButtonLink: FC<ButtonAsLink> = ({
  to,
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
    <Link to={to} className={cnButton} {...props}>
      <span className={styles.btn}>{children}</span>
    </Link>
  );
};
