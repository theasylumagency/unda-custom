import { motion, type MotionStyle } from "framer-motion";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import { HeroActions } from "./HeroActions";
import styles from "./hero.module.css";

interface HeroCopyProps {
  reducedMotion: boolean;
  scrollStyle?: MotionStyle;
  locale: Locale;
}

export function HeroCopy({ reducedMotion, scrollStyle, locale }: HeroCopyProps) {
  const { hero } = getCustomContent(locale);
  const { heroCopy } = hero;
  const initialFade = reducedMotion ? false : { opacity: 0 };

  return (
    <motion.div className={styles.copy} style={scrollStyle}>
      <motion.p
        className={styles.eyebrow}
        data-typography="meta"
        initial={initialFade}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {heroCopy.eyebrow}
        <span aria-hidden="true" />
      </motion.p>

      <h1 className={styles.headline} id="hero-title">
        <motion.span
          className={styles.headlineSerif}
          data-typography="hero-serif"
          initial={reducedMotion ? false : { opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.82, ease: [0.2, 0.72, 0.24, 1] }}
        >
          {heroCopy.headlineLines.map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </motion.span>
        <motion.span
          className={styles.headlineSansDesktop}
          data-typography="hero-sans"
          initial={reducedMotion ? false : { opacity: 0, y: 13 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.31, duration: 0.82, ease: [0.2, 0.72, 0.24, 1] }}
        >
          <span>{heroCopy.headlineSansDesktop[0]}</span>
          <span>{heroCopy.headlineSansDesktop[1]}</span>
          <span className={styles.headlineAccent}>{heroCopy.headlineSansDesktop[2]}</span>
        </motion.span>
        <motion.span
          className={styles.headlineSansMobile}
          data-typography="hero-sans"
          aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0, y: 11 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.31, duration: 0.82, ease: [0.2, 0.72, 0.24, 1] }}
        >
          <span>{heroCopy.headlineSansMobile[0]}</span>
          <span>{heroCopy.headlineSansMobile[1]}</span>
          <span>{heroCopy.headlineSansMobile[2]}</span>
          <span className={styles.headlineAccent}>{heroCopy.headlineSansMobile[3]}</span>
        </motion.span>
      </h1>

      <motion.p
        className={styles.supportingCopy}
        data-typography="body"
        initial={initialFade}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.54, duration: 0.62 }}
      >
        {heroCopy.supportingCopy.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            {index < heroCopy.supportingCopy.split("\n").length - 1 && <br className={styles.desktopBreak} />}
          </span>
        ))}
      </motion.p>

      <HeroActions reducedMotion={reducedMotion} locale={locale} />

      <motion.div
        className={styles.microcopy}
        initial={initialFade}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.88, duration: 0.58 }}
      >
        <span className={styles.microIcon} aria-hidden="true">
          <i />
        </span>
        <p>
          {heroCopy.microTitle}
          <span>{heroCopy.microcopy}</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
