import { motion, type MotionStyle } from "framer-motion";
import styles from "./hero.module.css";

const intersections = [14, 31, 51, 70, 88];

interface EditorialBeamProps {
  reducedMotion: boolean;
  scrollStyle?: MotionStyle;
}

export function EditorialBeam({ reducedMotion, scrollStyle }: EditorialBeamProps) {
  return (
    <motion.div
      className={styles.beam}
      aria-hidden="true"
      style={scrollStyle}
      initial={reducedMotion ? false : { opacity: 0, scaleY: 0.9 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: 0.28, duration: 1.28, ease: [0.2, 0.72, 0.24, 1] }}
    >
      <motion.span
        className={styles.beamGlowWide}
        animate={reducedMotion ? undefined : { opacity: [0.94, 1, 0.95] }}
        transition={{ delay: 2.8, duration: 7.5, ease: "easeInOut", repeat: Infinity }}
      />
      <span className={styles.beamGlowNarrow} />
      <span className={styles.beamCore} />
      {intersections.map((position, index) => (
        <motion.i
          key={position}
          style={{ top: `${position}%` }}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 + index * 0.12, duration: 0.4 }}
        />
      ))}
    </motion.div>
  );
}
