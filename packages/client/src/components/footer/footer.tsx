import { FC } from 'react';
import styles from './footer.module.pcss';
import cn from 'classnames';
import { Icon } from 'components/icon';
import { Link } from 'react-router-dom';

const ICON_COLOR = '#0f101b';
const COPYRIGHT = `@FC`;
const COPYRIGHT_EXPANDED = `@${new Date().getFullYear()}, Fancy Colors`;

type IconLink = {
  type: IconType;
  link: string;
};

type Props = {
  expanded: boolean;
  icons: IconLink[];
};

export const Footer: FC<Props> = ({ icons, expanded = true }) => {
  const footerClass = cn(styles.footer, {
    ['w-4 expanded']: expanded,
    ['w-1']: !expanded,
  });
  return (
    <footer className={footerClass}>
      {expanded && (
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
      <p className="text-main">{expanded ? COPYRIGHT_EXPANDED : COPYRIGHT}</p>
    </footer>
  );
};
