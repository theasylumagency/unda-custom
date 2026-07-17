"use client";

import {
  motion,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { HeroCopy } from "./HeroCopy";
import { HeroScene } from "./HeroScene";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import styles from "./hero.module.css";

interface CustomHeroProps {
  architectureStyle?: MotionStyle;
  beamStyle?: MotionStyle;
  copyStyle?: MotionStyle;
  davidStyle?: MotionStyle;
  fragmentStyle?: MotionStyle;
  reducedMotion: boolean;
  structureX?: MotionValue<number>;
  structureY?: MotionValue<number>;
  locale: Locale;
}

export function CustomHero({
  architectureStyle,
  beamStyle,
  copyStyle,
  davidStyle,
  fragmentStyle,
  reducedMotion,
  structureX,
  structureY,
  locale,
}: CustomHeroProps) {
  const { hero } = getCustomContent(locale);

  return (
    <motion.section
      className={styles.hero}
      data-nav-theme="dark"
      id="top"
      aria-labelledby="hero-title"
    >
      <HeroAtmosphere />
      <div className={styles.heroGrid}>
        <HeroCopy reducedMotion={reducedMotion} scrollStyle={copyStyle} locale={locale} />
        <HeroScene
          architectureStyle={architectureStyle}
          beamStyle={beamStyle}
          davidStyle={davidStyle}
          fragmentStyle={fragmentStyle}
          reducedMotion={reducedMotion}
          structureX={structureX}
          structureY={structureY}
          locale={locale}
        />
      </div>
      <motion.div
        className={styles.scrollCue}
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.5 }}
      >
        <span />
        <small>{hero.scrollCue}</small>
      </motion.div>
    </motion.section>
  );
}
