import { motion } from "framer-motion";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import styles from "./hero.module.css";

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 16">
      <path d="M1 8h20M15 2l6 6-6 6" />
    </svg>
  );
}

export function HeroActions({ reducedMotion, locale }: { reducedMotion: boolean; locale: Locale }) {
  const { hero } = getCustomContent(locale);
  const { heroActions } = hero;

  return (
    <motion.div
      className={styles.actions}
      data-typography="navigation"
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.58 }}
    >
      <a className={styles.primaryAction} href="#operator-intake">
        <span>{heroActions.primary}</span>
        <Arrow />
      </a>
      <a className={styles.secondaryAction} href="#work">
        <span>{heroActions.secondary}</span>
        <Arrow />
      </a>
    </motion.div>
  );
}
