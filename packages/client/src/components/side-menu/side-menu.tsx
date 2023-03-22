import { FC, useCallback, useEffect, useState } from 'react';
import styles from './side-menu.module.pcss';
import cn from 'classnames';
import { NavigationLink } from 'components/navigation-link';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ProfileLink } from 'components/profile-link';
import { Footer } from 'components/footer';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as LogoNarrow } from 'assets/logo-narrow.svg';
import { Icon } from 'components/icon';
import { RouterPaths } from 'src/app.types';
import { useAuth } from 'components/hooks/use-auth';
import { LINKS, SOCIAL_LINKS } from 'src/mock/side-menu-links';
import { useTheme } from 'components/hooks';
import { Theme } from 'components/hooks/use-theme';
import { Button, ButtonColor } from 'components/button';
import { ErrorBoundary } from 'utils/error-boundary';

export const SideMenu: FC = () => {
  const { logout, user } = useAuth();

  const [expanded, setExpanded] = useState(true);
  const { toggleTheme, theme } = useTheme();

  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const handleMenuOpen = useCallback(() => {
    if (window.innerWidth > 500) setExpanded(!expanded);
    else {
      const menuMain = document.querySelector('#app-menu-main');

      setExpanded(expanded);
      menuMain?.classList.toggle(styles.show);
    }
  }, [expanded]);

  useEffect(() => {
    if (path !== location.pathname) {
      handleMenuOpen();
      setPath(location.pathname);
    }
  }, [handleMenuOpen, location, path]);

  useEffect(() => {
    if (
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent
      )
    ) {
      window.addEventListener('load', handleSizeWindow);

      return () => {
        window.removeEventListener('load', handleSizeWindow);
      };
    } else {
      window.addEventListener('load', handleSizeWindow);
      window.addEventListener('resize', handleSizeWindow);

      return () => {
        window.removeEventListener('load', handleSizeWindow);
        window.removeEventListener('resize', handleSizeWindow);
      };
    }

    function handleSizeWindow() {
      if (window.innerWidth >= 500 && window.innerWidth < 1024)
        setExpanded(false);
      else setExpanded(true);

      if (window.innerWidth < 500) setExpanded(true);
    }
  });

  return (
    <>
      <section className={cn(styles.sideMenuMobile, 'w-12')}>
        <Button
          size="small"
          color={ButtonColor.ICON}
          classNameContent={styles.button}
          onClick={handleMenuOpen}
        >
          <Icon
            type="burger"
            size="small"
            color="var(--color-accent-primary)"
          />
        </Button>
      </section>
      <section
        id="app-menu-main"
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
          <Link to={RouterPaths.MAIN} className={styles.logoLink}>
            <div className={styles.logo}>
              {expanded ? (
                <Logo width="100%" height="100%" />
              ) : (
                <LogoNarrow width="100%" height="100%" />
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
              <ErrorBoundary>
                <NavLink to={RouterPaths.PROFILE}>
                  {({ isActive }) => (
                    <ProfileLink
                      user={user}
                      active={isActive}
                      expanded={expanded}
                    />
                  )}
                </NavLink>
              </ErrorBoundary>
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
            onClick={handleMenuOpen}
          >
            <Icon type="arrow" size="medium" />
            {expanded && <span>Свернуть меню</span>}
          </button>
          <button
            type="button"
            className={cn(styles.themeToggler, { [styles.expanded]: expanded })}
            onClick={toggleTheme}
          >
            <Icon type="theme-toggle" size="medium" />
            {expanded && (
              <span>{theme === Theme.LIGHT ? 'Тёмная' : 'Светлая'} тема</span>
            )}
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
    </>
  );
};
