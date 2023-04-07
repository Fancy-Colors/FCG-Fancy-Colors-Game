import { FC, useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as LogoNarrow } from 'assets/logo-narrow.svg';
import { Icon } from 'components/icon';
import { useAuth, useTheme, useWindowSize } from 'components/hooks';
import { Theme } from 'components/hooks/use-theme';
import { NavigationLink } from 'components/navigation-link';
import { ProfileLink } from 'components/profile-link';
import { Footer } from 'components/footer';
import { BurgerMenu } from 'components/burger-menu';
import { ErrorBoundary } from 'utils/error-boundary';
import { RouterPaths } from 'src/app.types';
import { LINKS, SOCIAL_LINKS } from 'src/mock/side-menu-links';
import styles from './side-menu.module.pcss';

export const SideMenu: FC = () => {
  const { logout, user } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const { width } = useWindowSize();
  const location = useLocation();

  const [expanded, setExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const handleMenuOpen = useCallback(() => {
    if (width > 500) {
      setExpanded(!expanded);
    } else {
      setExpanded(true);
      setIsVisible(!isVisible);
    }
  }, [expanded, isVisible, width]);

  useEffect(() => {
    setIsVisible(false);
  }, [location.pathname]);

  useEffect(() => {
    if (width >= 500 && width < 1024) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [width]);

  return (
    <>
      <BurgerMenu onClick={handleMenuOpen} />
      <section
        className={cn(styles.sideMenu, isVisible && styles.show, {
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

          <Link to={RouterPaths.HOW_TO} className="text-main">
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
