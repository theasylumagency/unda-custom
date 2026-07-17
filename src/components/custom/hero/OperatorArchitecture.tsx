import { motion, type MotionStyle } from "framer-motion";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import styles from "./hero.module.css";

interface OperatorArchitectureProps {
  reducedMotion: boolean;
  scrollStyle?: MotionStyle;
  locale: Locale;
}

export function OperatorArchitecture({ reducedMotion, scrollStyle, locale }: OperatorArchitectureProps) {
  const { hero } = getCustomContent(locale);
  const { operatorModules, operatorArchitecture } = hero;

  return (
    <motion.div className={styles.architecture} aria-hidden="true" style={scrollStyle}>
      <motion.p
        className={styles.architectureTitle}
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.42, duration: 0.48 }}
      >
        {operatorArchitecture.title}
      </motion.p>
      <div className={styles.architectureRail} />
      <div className={styles.modules}>
        {operatorModules.map((module, index) => (
          <motion.div
            className={styles.operatorModule}
            key={module.id}
            initial={reducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + index * 0.15, duration: 0.58, ease: "easeOut" }}
          >
            <i />
            <p>{module.title}</p>
            <span>{module.description}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className={styles.operatorReady}
        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.14, duration: 0.55 }}
      >
        <span className={styles.readyMark}><i /></span>
        <p>{operatorArchitecture.ready}</p>
        <strong>{operatorArchitecture.readySub}</strong>
      </motion.div>
    </motion.div>
  );
}
