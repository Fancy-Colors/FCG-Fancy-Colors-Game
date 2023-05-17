import { FC } from 'react';
import styles from './navigation-link.module.pcss';
import cn from 'classnames';
import { Icon } from 'components/icon';

type Props = {
  expanded: boolean;
  iconType: IconType;
  active: boolean;
  text: string;
};

export const NavigationLink: FC<Props> = ({
  iconType,
  active,
  text,
  expanded = true,
}) => {
  return (
    <div
      className={cn(styles.navigation, {
        [styles.active]: active,
        [styles.expanded]: expanded,
      })}
    >
      <Icon type={iconType} size="small" />
      {expanded && (
        <div className={styles.textAndInfoWrap}>
          <p className={cn(styles.text, 'text-main')}>{text}</p>
        </div>
      )}
    </div>
  );
};
