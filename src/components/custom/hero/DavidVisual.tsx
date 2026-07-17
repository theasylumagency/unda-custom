import { getImageProps } from "next/image";
import { motion, type MotionStyle, type MotionValue } from "framer-motion";
import styles from "./hero.module.css";

function ResponsiveDavidImage() {
  const common = {
    alt: "",
    loading: "eager" as const,
    sizes: "(max-width: 767px) 100vw, 48vw",
  };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1024,
    height: 1536,
    quality: 90,
    src: "/custom/hero/david-base-desktop.webp",
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 768,
    height: 1094,
    quality: 86,
    src: "/custom/hero/david-base-mobile.webp",
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img {...rest} alt="" className={styles.davidBase} fetchPriority="high" />
    </picture>
  );
}

interface DavidVisualProps {
  reducedMotion: boolean;
  scrollStyle?: MotionStyle;
  structureX?: MotionValue<number>;
  structureY?: MotionValue<number>;
}

export function DavidVisual({ reducedMotion, scrollStyle, structureX, structureY }: DavidVisualProps) {
  const structureStyle = structureX || structureY ? { x: structureX, y: structureY } : undefined;

  return (
    <motion.div className={styles.david} aria-hidden="true" style={scrollStyle}>
      <motion.div
        className={styles.davidFloat}
        initial={reducedMotion ? false : { opacity: 0.34 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: [0, -4, 0] }}
        transition={{
          opacity: { delay: 0.15, duration: 1.1, ease: "easeOut" },
          y: { delay: 2.7, duration: 7.2, ease: "easeInOut", repeat: Infinity },
        }}
      >
        <div className={styles.davidHalo} />
        <ResponsiveDavidImage />
        <motion.picture
          style={structureStyle}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.66, duration: 1.1, ease: "easeOut" }}
        >
          <source media="(min-width: 768px)" srcSet="/custom/hero/david-structure-desktop.webp" />
          <source media="(max-width: 767px)" srcSet="/custom/hero/david-structure-mobile.webp" />
          {/* Art-directed transparent overlay; the source WebP is already optimized. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className={styles.davidStructure} src="/custom/hero/david-structure-mobile.webp" />
        </motion.picture>
        <motion.picture
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: reducedMotion ? 0 : 0.82, duration: reducedMotion ? 0 : 1.1, ease: "easeOut" }}
        >
          <source media="(min-width: 768px)" srcSet="/custom/hero/david-light-desktop.webp" />
          {/* Art-directed transparent overlay; the source WebP is already optimized. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className={styles.davidLight}
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          />
        </motion.picture>
        <motion.div
          className={styles.structureNodeLayer}
          style={structureStyle}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.88, duration: 1.05, ease: "easeOut" }}
        >
          <svg className={styles.structureNodes} viewBox="0 0 420 760">
            <g>
              <path d="M54 95 116 73l53 42 67-19 49 53M72 186l64-28 57 36 72-16M91 272l55-31 65 30 62-25M70 373l71-34 55 41 68-24M112 472l64-25 52 36 57-16M84 574l71-42 63 37 70-28" />
              {[[54, 95], [116, 73], [169, 115], [72, 186], [136, 158], [193, 194], [91, 272], [146, 241], [211, 271], [70, 373], [141, 339], [196, 380], [112, 472], [176, 447], [228, 483], [84, 574], [155, 532], [218, 569]].map(([cx, cy]) => (
                <circle cx={cx} cy={cy} key={`${cx}-${cy}`} r="2" />
              ))}
            </g>
          </svg>
        </motion.div>
        <div className={styles.davidFade} />
      </motion.div>
    </motion.div>
  );
}
