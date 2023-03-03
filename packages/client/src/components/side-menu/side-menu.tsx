import { FC, useState } from 'react';
import styles from './side-menu.module.pcss';
import cn from 'classnames';
import { NavigationLink } from 'components/navigation-link';
import { Link } from 'react-router-dom';
import { ProfileLink } from 'components/profile-link';
import { Footer } from 'components/footer';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as LogoNarrow } from 'assets/logo-narrow.svg';
import { Icon } from 'components/icon';
import { LINKS, EXIT, PROFILE, SOCIAL_LINKS } from 'src/mock/side-menu-links';

// пока что хардкод...
const LOGO_COLOR = '#6644ec';

export const SideMenu: FC = () => {
  const [activeLink, setActiveLink] = useState(LINKS[0].link);
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
        <Link to="/" onClick={() => setActiveLink('/')}>
          <div className={styles.logo}>
            {expanded ? (
              <Logo width="100%" height="100%" fill={LOGO_COLOR} />
            ) : (
              <LogoNarrow width="100%" height="100%" fill={LOGO_COLOR} />
            )}
          </div>
        </Link>

        <div className={styles.mainLinksWrap}>
          {expanded && <p className={cn(styles.textMenu, 'text-menu')}>Меню</p>}
          {LINKS.map(({ iconType, text, link, informer }) => (
            <Link key={iconType} to={link} onClick={() => setActiveLink(link)}>
              <NavigationLink
                text={text}
                iconType={iconType}
                active={link === activeLink}
                expanded={expanded}
                informer={informer}
              />
            </Link>
          ))}
        </div>

        {expanded && <div className={styles.delimiter} />}

        <Link to="profile" onClick={() => setActiveLink('/profile')}>
          <ProfileLink {...PROFILE} expanded={expanded} />
        </Link>

        {expanded && (
          <>
            <div className={styles.delimiter} />
            <Link
              to="/how-to"
              className="text-main"
              state={{ fromOwnHost: true }}
            >
              Как играть в Fancy Colors?
            </Link>
          </>
        )}
        <button
          type="button"
          className={cn(styles.menuToggler, { [styles.expanded]: expanded })}
          onClick={() => setExpanded(!expanded)}
        >
          <Icon type="arrow" size="medium" color="#0f101b" />
        </button>
      </nav>
      <div>
        <button
          className={cn(styles.exit, {
            ['w-3']: expanded,
            ['w-1']: !expanded,
          })}
        >
          <NavigationLink
            text={EXIT.text}
            iconType={EXIT.iconType}
            active={EXIT.link === activeLink}
            expanded={expanded}
          />
        </button>
        <Footer expanded={expanded} links={SOCIAL_LINKS} />
      </div>
    </section>
  );
};
