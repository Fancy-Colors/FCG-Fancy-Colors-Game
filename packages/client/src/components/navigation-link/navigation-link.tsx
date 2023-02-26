import { FC } from 'react';
import styles from './navigation-link.module.pcss';
import cn from 'classnames';
import { Icon } from 'components/icon';

const ICON_COLOR = '#0f101b';

type Props = {
  size: 's' | 'l';
  iconType: IconType;
  active: boolean;
  text: string;
  informer?: string;
};

export const NavigationLink: FC<Props> = ({
  iconType,
  active,
  text,
  informer,
  size = 'l',
}) => {
  return (
    <div
      className={cn(styles.navigation, styles[size], {
        [styles.active]: active,
      })}
    >
      <Icon type={iconType} size="small" color={ICON_COLOR} />
      {size === 'l' && (
        <div className={styles.textAndInfoWrap}>
          <p className={cn(styles.text, 'text-main')}>{text}</p>
          {informer && <div className={styles.informer}>{informer}</div>}
        </div>
      )}
    </div>
  );
};
