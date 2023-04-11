import { FC } from 'react';
import cn from 'classnames';
import { Icon } from 'components/icon';
import { Button, ButtonColor } from 'components/button';
import styles from './burger-menu.module.pcss';

type Props = {
  onClick: () => void;
};

export const BurgerMenu: FC<Props> = ({ onClick }) => {
  return (
    <section className={cn(styles.burgerMenu, 'w-12')}>
      <Button
        size="small"
        color={ButtonColor.ICON}
        classNameContent={styles.button}
        onClick={onClick}
      >
        <Icon type="burger" size="small" color="var(--color-accent-primary)" />
      </Button>
    </section>
  );
};
