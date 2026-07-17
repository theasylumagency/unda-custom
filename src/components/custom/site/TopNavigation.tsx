"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import styles from "./top-navigation.module.css";

type NavigationTheme = "dark" | "light";

function NavigationLink({
  item,
  onNavigate,
}: {
  item: { label: string; href: string; external?: boolean; emphasis?: boolean };
  onNavigate?: () => void;
}) {
  const className = item.emphasis ? styles.projectLink : styles.navigationLink;
  const content = (
    <>
      <span>{item.label}</span>
      {item.external ? <i aria-hidden="true">↗</i> : null}
    </>
  );

  if (item.external) {
    return (
      <a
        className={className}
        href={item.href}
        onClick={onNavigate}
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={item.href} onClick={onNavigate}>
      {content}
    </Link>
  );
}

function LanguageIndicator({ locale, label }: { locale: Locale; label: string }) {
  return (
    <p className={styles.language} aria-label={label} data-typography="navigation">
      <Link href="/ka" prefetch={false}>
        <span aria-current={locale === "ka" ? "true" : "false"}>KA</span>
      </Link>
      <i aria-hidden="true">/</i>
      <Link href="/en" prefetch={false}>
        <span aria-current={locale === "en" ? "true" : "false"}>EN</span>
      </Link>
    </p>
  );
}

export function TopNavigation({ locale }: { locale: Locale }) {
  const { site } = getCustomContent(locale);
  const {
    currentLanguage,
    homeLabel,
    menuClose: menuCloseLabel,
    menuOpen: menuOpenLabel,
    mobileNavigationLabel,
    mobilePrimaryNavigationLabel,
    mobileTagline,
    primaryNavigation,
    primaryNavigationLabel,
  } = site;

  const [theme, setTheme] = useState<NavigationTheme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateTheme = () => {
      animationFrame = null;
      const sampleX = Math.round(window.innerWidth / 2);
      const sampleY = Math.min(82, window.innerHeight - 1);
      const elementsAtNavigationEdge = document.elementsFromPoint(sampleX, sampleY);

      for (const element of elementsAtNavigationEdge) {
        const themedRegion = element.closest<HTMLElement>("[data-nav-theme]");
        const nextTheme = themedRegion?.dataset.navTheme;

        if (nextTheme === "dark" || nextTheme === "light") {
          setTheme(nextTheme);
          break;
        }
      }
    };

    const scheduleThemeUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateTheme);
      }
    };

    scheduleThemeUpdate();
    window.addEventListener("scroll", scheduleThemeUpdate, { passive: true });
    window.addEventListener("resize", scheduleThemeUpdate);

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", scheduleThemeUpdate);
      window.removeEventListener("resize", scheduleThemeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    menuPanelRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      menuButton?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={styles.header}
      data-menu-open={menuOpen ? "true" : "false"}
      data-theme={theme}
    >
      <div className={styles.navigationShell}>
        <Link className={styles.brand} href={`/${locale}`} aria-label={homeLabel} onClick={closeMenu}>
          <span>unda.ai</span>
          <i aria-hidden="true">/</i>
          <small>CUSTOM</small>
        </Link>

        <nav className={styles.desktopNavigation} aria-label={primaryNavigationLabel} data-typography="navigation">
          {primaryNavigation.map((item) => (
            <NavigationLink item={item} key={item.label} />
          ))}
        </nav>

        <div className={styles.desktopLanguage}>
          <LanguageIndicator locale={locale} label={currentLanguage} />
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          className={styles.menuButton}
          data-typography="navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          ref={menuButtonRef}
          type="button"
        >
          {menuOpen ? menuCloseLabel : menuOpenLabel}
        </button>
      </div>

      <div
        aria-hidden={!menuOpen}
        aria-label={mobileNavigationLabel}
        aria-modal="true"
        className={styles.mobilePanel}
        data-open={menuOpen ? "true" : "false"}
        id="mobile-navigation"
        ref={menuPanelRef}
        role="dialog"
        tabIndex={-1}
      >
        <nav aria-label={mobilePrimaryNavigationLabel}>
          {primaryNavigation.map((item, index) => (
            <div className={styles.mobileNavigationItem} key={item.label}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <NavigationLink item={item} onNavigate={closeMenu} />
            </div>
          ))}
        </nav>
        <div className={styles.mobilePanelFooter}>
          <LanguageIndicator locale={locale} label={currentLanguage} />
          <p>{mobileTagline}</p>
        </div>
      </div>
    </header>
  );
}
