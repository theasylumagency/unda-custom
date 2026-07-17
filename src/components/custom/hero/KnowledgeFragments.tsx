import { motion, type MotionStyle } from "framer-motion";
import type { FragmentIcon } from "@/content/custom/types";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import styles from "./hero.module.css";

function FragmentIconGraphic({ icon }: { icon: FragmentIcon }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2 };

  switch (icon) {
    case "database":
      return <><ellipse cx="8" cy="4" rx="5" ry="2.5" {...common} /><path d="M3 4v8c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V4M3 8c0 1.4 2.2 2.5 5 2.5S13 9.4 13 8" {...common} /></>;
    case "alert":
      return <><circle cx="8" cy="8" r="6.3" {...common} /><path d="M8 4.5v4.7M8 12v.1" {...common} /></>;
    case "edit":
      return <><path d="M3 13h3l7-7-3-3-7 7v3Z" {...common} /><path d="m9 4 3 3M9.5 13H14" {...common} /></>;
    case "shield":
      return <path d="M8 1.8 13.5 4v4.3c0 3.5-2.2 5.5-5.5 6.9-3.3-1.4-5.5-3.4-5.5-6.9V4L8 1.8Z" {...common} />;
    case "action":
      return <path d="m4 2.5 9 5.5-9 5.5v-11Z" {...common} />;
    case "decision":
      return <><path d="M3.2 9.5c0-3.5 1.6-6.8 4.8-6.8s4.8 3.3 4.8 6.8M5 14c0-5.5 1-8.8 3-8.8s3 3.3 3 8.8M7.2 14c0-3.6.2-6.4.8-6.4s.8 2.8.8 6.4" {...common} /></>;
    default:
      return <><circle cx="8" cy="4.8" r="2.7" {...common} /><path d="M2.8 14c.6-3 2.4-4.8 5.2-4.8s4.6 1.8 5.2 4.8H2.8Z" {...common} /></>;
  }
}

interface KnowledgeFragmentsProps {
  reducedMotion: boolean;
  scrollStyle?: MotionStyle;
  locale: Locale;
}

export function KnowledgeFragments({ reducedMotion, scrollStyle, locale }: KnowledgeFragmentsProps) {
  const { hero } = getCustomContent(locale);
  const { knowledgeFragments } = hero;

  return (
    <motion.div className={styles.fragments} aria-hidden="true" style={scrollStyle}>
      {knowledgeFragments.map((fragment, index) => (
        <motion.div
          className={`${styles.fragment} ${styles[`fragment${index + 1}`]}`}
          key={fragment.id}
          initial={reducedMotion ? false : { opacity: 0, x: -15 }}
          animate={
            reducedMotion
              ? { opacity: 1, x: 0 }
              : { opacity: 1, x: 0, y: [0, index % 2 === 0 ? -1.5 : 1.5, 0] }
          }
          transition={{
            opacity: { delay: 0.66 + index * 0.1, duration: 0.62, ease: "easeOut" },
            x: { delay: 0.66 + index * 0.1, duration: 0.62, ease: "easeOut" },
            y: {
              delay: 2.8 + index * 0.16,
              duration: 7.4 + (index % 3) * 0.65,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
        >
          <span className={styles.fragmentIcon}>
            <svg viewBox="0 0 16 16"><FragmentIconGraphic icon={fragment.icon as FragmentIcon} /></svg>
          </span>
          <span className={styles.fragmentText}>{fragment.label}</span>
          {"mobileLabel" in fragment ? (
            <span className={styles.mobileFragmentText}>{fragment.mobileLabel}</span>
          ) : null}
          <span className={styles.fragmentRule} />
          <motion.span
            className={styles.fragmentConnector}
            initial={reducedMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.84 + index * 0.1, duration: 0.66, ease: "easeOut" }}
          />
          <motion.i
            className={styles.fragmentNode}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.12 + index * 0.1, duration: 0.34 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
