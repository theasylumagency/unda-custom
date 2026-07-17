import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import styles from "./start-with-work.module.css";

interface StartWithWorkSectionProps {
  reducedMotion: boolean;
  locale: Locale;
}

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 1.15, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StartWithWorkSection({ reducedMotion, locale }: StartWithWorkSectionProps) {
  const { intake } = getCustomContent(locale);
  const { startWithWorkCopy, startingSignals } = intake;

  const layoutRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(layoutRef, { amount: 0.28, once: true });

  return (
    <section className={styles.section} data-nav-theme="dark" id="operator-intake" aria-labelledby="start-with-work-title">
      <div className={styles.atmosphere} aria-hidden="true">
        <i className={styles.horizon} />
        <i className={styles.glow} />
      </div>

      <motion.div
        animate={reducedMotion || isInView ? "visible" : "hidden"}
        className={styles.layout}
        initial={reducedMotion ? false : "hidden"}
        ref={layoutRef}
        variants={sectionVariants}
      >
        <header className={styles.copy}>
          <motion.p className={styles.eyebrow} data-typography="meta" variants={revealVariants}>
            {startWithWorkCopy.eyebrow}
          </motion.p>
          <h2 id="start-with-work-title" data-typography="editorial-title">
            {startWithWorkCopy.headlineLines.map((line) => (
              <motion.span key={line} variants={revealVariants}>{line}</motion.span>
            ))}
          </h2>

          <motion.div className={styles.supporting} data-typography="body" variants={revealVariants}>
            <p>{startWithWorkCopy.supportingLead}</p>
            <p>{startWithWorkCopy.supporting}</p>
          </motion.div>

          <motion.div className={styles.actionGroup} variants={revealVariants}>
            <a className={styles.cta} data-typography="navigation" href="#workflow-start">
              <span>{startWithWorkCopy.cta}</span>
              <i aria-hidden="true">→</i>
            </a>
            <p className={styles.microcopy}>
              <i aria-hidden="true" />
              {startWithWorkCopy.microcopy}
            </p>
          </motion.div>
        </header>

        <motion.aside
          className={styles.startingPoint}
          id="workflow-start"
          aria-labelledby="workflow-start-label"
          variants={revealVariants}
        >
          <p className={styles.promptLabel} data-typography="meta" id="workflow-start-label">
            <span>01</span>
            {startWithWorkCopy.promptLabel}
          </p>

          <ul className={styles.signals} data-typography="body">
            {startingSignals.map((signal, index) => (
              <motion.li key={signal.id} variants={revealVariants}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>“{signal.text}”</p>
              </motion.li>
            ))}
          </ul>

          <div className={styles.firstLine} aria-hidden="true">
            <motion.i className={styles.line} variants={lineVariants} />
            <motion.i className={styles.startNode} variants={revealVariants} />
            <motion.i className={styles.openNode} variants={revealVariants} />
            <span>{startWithWorkCopy.firstSignal}</span>
            <small>{startWithWorkCopy.placeToBegin}</small>
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}
