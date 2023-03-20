import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cn from 'classnames';
import styles from './button.module.pcss';

export enum ButtonColor {
  GRADIENT = 'GRADIENT',
  COLORED = 'COLORED',
  LIGHT = 'LIGHT',
  ICON = 'ICON',
}

const buttonColorChoice = {
  [ButtonColor.GRADIENT]: styles.gradient,
  [ButtonColor.COLORED]: styles.colored,
  [ButtonColor.LIGHT]: styles.light,
  [ButtonColor.ICON]: styles.icon,
};

type Props = {
  color?: keyof typeof ButtonColor;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  classNameContent?: string;
  children: JSX.Element | JSX.Element[] | string;
};

type ButtonAsLink = {
  to: string;
} & Props &
  LinkProps;

type ButtonAsButton = Props & JSX.IntrinsicElements['button'];

export const Button: FC<ButtonAsButton> = ({
  type = 'button',
  color = ButtonColor.COLORED,
  size = 'medium',
  className,
  classNameContent,
  children,
  ...props
}) => {
  const cnButton = cn(
    className,
    styles.button,
    styles[size],
    buttonColorChoice[color] ?? styles.colored
  );

  return (
    <button type={type} className={cnButton} {...props}>
      <span className={classNameContent}>{children}</span>
    </button>
  );
};

export const ButtonLink: FC<ButtonAsLink> = ({
  to,
  color = ButtonColor.COLORED,
  size = 'medium',
  className,
  classNameContent,
  children,
  ...props
}) => {
  const cnButton = cn(
    className,
    styles.button,
    styles[size],
    buttonColorChoice[color] ?? styles.colored
  );

  return (
    <Link to={to} className={cnButton} {...props}>
      <span className={classNameContent}>{children}</span>
    </Link>
  );
};
