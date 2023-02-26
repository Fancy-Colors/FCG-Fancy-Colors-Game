import { FC } from 'react';
import styles from './footer.module.pcss';
import cn from 'classnames';
import { Icon } from 'components/icon';
import { Link } from 'react-router-dom';

const ICON_COLOR = '#0f101b';
const COPYRIGHT = `@FC`;
const COPYRIGHT_FULL = `@${new Date().getFullYear()}, Fancy Colors`;

type IconLink = {
  type: IconType;
  link: string;
};

type Props = {
  size: 's' | 'l';
  icons: IconLink[];
};

export const Footer: FC<Props> = ({ icons, size = 'l' }) => {
  const footerClass = cn(styles.footer, styles[size], {
    ['w-4']: size === 'l',
    ['w-1']: size === 's',
  });
  return (
    <footer className={footerClass}>
      {size === 'l' && (
        <ul className={styles.icons}>
          {icons.map(({ type, link }) => (
            <li key={`social-link-${type}`}>
              <Link to={link} target="_blank">
                <Icon type={type} size="medium" color={ICON_COLOR} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="text-main">{size === 'l' ? COPYRIGHT_FULL : COPYRIGHT}</p>
    </footer>
  );
};
