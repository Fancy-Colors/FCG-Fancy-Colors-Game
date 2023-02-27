import { FC } from 'react';
import styles from './footer.module.pcss';
import cn from 'classnames';
import { Icon } from 'components/icon';
import { Link } from 'react-router-dom';

const ICON_COLOR = '#0f101b';
const COPYRIGHT = `@FC`;
const COPYRIGHT_EXPANDED = `@${new Date().getFullYear()}, Fancy Colors`;

type Link = {
  icon: IconType;
  link: string;
};

type Props = {
  expanded: boolean;
  links: Link[];
};

export const Footer: FC<Props> = ({ links, expanded = true }) => {
  const footerClass = cn(styles.footer, {
    ['w-4 expanded']: expanded,
    ['w-1']: !expanded,
  });
  return (
    <footer className={footerClass}>
      {expanded && (
        <ul className={cn(styles.icons, 'w-3')}>
          {links.map(({ icon, link }) => (
            <li key={link}>
              <a href={link} target="_blank" rel="noreferrer">
                <Icon type={icon} size="medium" color={ICON_COLOR} />
              </a>
            </li>
          ))}
        </ul>
      )}
      <p
        className={cn('text-main', {
          [styles.expanded]: expanded,
          ['w-3']: expanded,
        })}
      >
        {expanded ? COPYRIGHT_EXPANDED : COPYRIGHT}
      </p>
    </footer>
  );
};
