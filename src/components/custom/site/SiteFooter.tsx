import Link from "next/link";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import styles from "./site-footer.module.css";

export function SiteFooter({ locale }: { locale: Locale }) {
  const { site } = getCustomContent(locale);
  const {
    footerGroups,
    footerBrand,
    footerBrandHighlight,
    footerCredit,
    footerCreditLink,
    footerCopyright,
    footerNavigationLabel,
    homeLabel,
  } = site;

  return (
    <footer className={styles.footer} data-nav-theme="dark">
      <div className={styles.footerInner}>
        <div className={styles.brandColumn}>
          <Link className={styles.footerBrand} href={`/${locale}`} aria-label={homeLabel}>
            unda.ai
          </Link>
          <p>
            {footerBrand}
            <span>{footerBrandHighlight}</span>
          </p>
        </div>

        <nav className={styles.footerNavigation} aria-label={footerNavigationLabel} data-typography="navigation">
          {footerGroups.map((group) => (
            <section className={styles.linkGroup} key={group.title}>
              <h2 data-typography="meta">{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a href={link.href} rel="noreferrer" target="_blank">
                        <span>{link.label}</span>
                        <i aria-hidden="true">↗</i>
                      </a>
                    ) : (
                      <Link data-emphasis={"emphasis" in link && link.emphasis ? "true" : undefined} href={link.href}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <div className={styles.footerBottom} data-typography="meta">
          <p>
            {footerCredit}
            <a href="https://theasylum.agency" rel="noreferrer" target="_blank">
              {footerCreditLink}
            </a>
          </p>
          <p>{footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
