'use client';
import { getLocalizedText, navigationLinks, profile, siteCopy } from '@/data/portfolio';
import { useColorMode } from '@/providers/providers';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Brand,
  ContactEmail,
  Controls,
  FooterMeta,
  Header,
  HeaderNav,
  Index,
  MenuButton,
  MenuFooter,
  MobileIndex,
  MobileItem,
  MobileLink,
  MobileList,
  MobileMenu,
  Monogram,
  NavLink,
  NavList,
  SocialLinks,
  ThemeOption,
  ThemeToggle,
} from './styles/SiteHeader.styles';

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { colorMode, toggleColorMode } = useColorMode();
  const email = profile.contactChannels.find((channel) => channel.id === 'email');
  const github = profile.contactChannels.find((channel) => channel.id === 'github');
  const linkedin = profile.contactChannels.find((channel) => channel.id === 'linkedin');

  useEffect(() => {
    const observed = navigationLinks
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (observed.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    observed.forEach((element) => observer.observe(element));

    const onScroll = () => {
      if (window.scrollY < 160) setActiveSection(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  // Close the mobile menu if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const renderLinks = (
    links: readonly (typeof navigationLinks)[number][],
    numbered: boolean,
    offset = 0,
  ) =>
    links.map((item, index) => (
      <li key={item.id}>
        <NavLink
          href={item.href}
          $active={activeSection === item.id}
          aria-current={activeSection === item.id ? 'location' : undefined}
          onClick={() => setMenuOpen(false)}
        >
          {numbered && <Index>0{offset + index + 1}</Index>}
          {getLocalizedText(item.label)}
        </NavLink>
      </li>
    ));

  const renderThemeToggle = (inMenu = false) => (
    <ThemeToggle $inMenu={inMenu} role="group" aria-label="Color theme">
      <ThemeOption
        type="button"
        $active={colorMode === 'light'}
        aria-pressed={colorMode === 'light'}
        onClick={() => colorMode !== 'light' && toggleColorMode()}
      >
        Light
      </ThemeOption>
      <ThemeOption
        type="button"
        $active={colorMode === 'dark'}
        aria-pressed={colorMode === 'dark'}
        onClick={() => colorMode !== 'dark' && toggleColorMode()}
      >
        Dark
      </ThemeOption>
    </ThemeToggle>
  );

  return (
    <>
      <Header>
        <HeaderNav aria-label={getLocalizedText(siteCopy.navigationLabel)}>
          <Brand href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {getLocalizedText(profile.brand)}
          </Brand>
          <NavList $side="left">{renderLinks(navigationLinks.slice(0, 2), true)}</NavList>
          <Monogram
            href="/"
            aria-label={`${profile.initials} — ${getLocalizedText(siteCopy.homeLabel)}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {profile.initials}
          </Monogram>
          <NavList $side="right">{renderLinks(navigationLinks.slice(2), true, 2)}</NavList>
          <NavList $side="compact">{renderLinks(navigationLinks, false)}</NavList>
          <Controls>
            {renderThemeToggle()}
            <MenuButton
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={getLocalizedText(
                menuOpen ? siteCopy.closeNavigation : siteCopy.openNavigation,
              )}
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
              {menuOpen ? '×' : 'Menu'}
            </MenuButton>
          </Controls>
        </HeaderNav>
      </Header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            id="mobile-navigation"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <MobileList>
              {navigationLinks.map((item, index) => (
                <MobileItem
                  key={item.id}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.18 + index * 0.07,
                    duration: prefersReducedMotion ? 0 : 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <MobileLink href={item.href} onClick={() => setMenuOpen(false)}>
                    {getLocalizedText(item.label)}
                    <MobileIndex>0{index + 1}</MobileIndex>
                  </MobileLink>
                </MobileItem>
              ))}
            </MobileList>
            <MenuFooter
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.45,
                duration: prefersReducedMotion ? 0 : 0.5,
              }}
            >
              {renderThemeToggle(true)}
              {email && <ContactEmail href={email.href}>{email.value}</ContactEmail>}
              <FooterMeta>
                <span>{getLocalizedText(profile.location)}</span>
                <SocialLinks>
                  {github && (
                    <a href={github.href} target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  )}
                  {linkedin && (
                    <a href={linkedin.href} target="_blank" rel="noopener noreferrer">
                      LinkedIn ↗
                    </a>
                  )}
                </SocialLinks>
              </FooterMeta>
            </MenuFooter>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
