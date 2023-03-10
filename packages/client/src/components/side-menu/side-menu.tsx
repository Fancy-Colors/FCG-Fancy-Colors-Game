import { FC, useState } from 'react';
import styles from './side-menu.module.pcss';
import cn from 'classnames';
import { NavigationLink } from 'components/navigation-link';
import { Link, NavLink } from 'react-router-dom';
import { ProfileLink } from 'components/profile-link';
import { Footer } from 'components/footer';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as LogoNarrow } from 'assets/logo-narrow.svg';
import { Icon } from 'components/icon';
import { RouterPaths } from 'src/app.types';
import { useAuth } from 'components/hooks/use-auth';

import { LINKS, SOCIAL_LINKS } from 'src/mock/side-menu-links';

// пока что хардкод...
const LOGO_COLOR = '#6644ec';

export const SideMenu: FC = () => {
  const { logout, user } = useAuth();
  const [expanded, setExpanded] = useState(true);

  return (
    <section
      className={cn(styles.sideMenu, {
        ['w-4']: expanded,
        ['w-1']: !expanded,
      })}
    >
      <nav
        className={cn(styles.nav, {
          ['w-3']: expanded,
          ['w-1']: !expanded,
        })}
      >
        <Link to={RouterPaths.MAIN}>
          <div className={styles.logo}>
            {expanded ? (
              <Logo width="100%" height="100%" fill={LOGO_COLOR} />
            ) : (
              <LogoNarrow width="100%" height="100%" fill={LOGO_COLOR} />
            )}
          </div>
        </Link>

        {expanded && <p className={cn(styles.textMenu, 'text-menu')}>Меню</p>}
        {LINKS.map(({ iconType, text, link, informer }) => (
          <NavLink key={iconType} to={link}>
            {({ isActive }) => (
              <NavigationLink
                text={text}
                iconType={iconType}
                active={isActive}
                expanded={expanded}
                informer={informer}
              />
            )}
          </NavLink>
        ))}

        {user && (
          <>
            {expanded && <div className={styles.delimiter} />}
            <NavLink to={RouterPaths.PROFILE}>
              {({ isActive }) => (
                <ProfileLink
                  user={user}
                  active={isActive}
                  expanded={expanded}
                />
              )}
            </NavLink>
          </>
        )}

        {expanded && <div className={styles.delimiter} />}

        <Link
          to={RouterPaths.HOW_TO}
          className="text-main"
          state={{ fromOwnHost: true }}
        >
          <p
            className={cn(styles.howToText, 'text-menu')}
            data-expanded={expanded}
          >
            {expanded ? 'Как играть в Fancy Colors?' : '?'}
          </p>
        </Link>

        <button
          type="button"
          className={cn(styles.menuToggler, { [styles.expanded]: expanded })}
          onClick={() => setExpanded(!expanded)}
        >
          <Icon type="arrow" size="medium" color="#0f101b" />
        </button>
      </nav>
      <div>
        {user ? (
          <button
            onClick={logout}
            className={cn(styles.authLink, {
              ['w-3']: expanded,
              ['w-1']: !expanded,
            })}
          >
            <NavigationLink
              text="Выйти"
              iconType="exit"
              active={false}
              expanded={expanded}
            />
          </button>
        ) : (
          <Link
            to={RouterPaths.LOGIN}
            className={cn(styles.authLink, {
              ['w-3']: expanded,
              ['w-1']: !expanded,
            })}
          >
            <NavigationLink
              text="Войти"
              iconType="user"
              active={false}
              expanded={expanded}
            />
          </Link>
        )}
        <Footer expanded={expanded} links={SOCIAL_LINKS} />
      </div>
    </section>
  );
};
