import styles from "./hero.module.css";

export function HeroAtmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <div className={styles.faceLight} />
      <svg className={styles.surface} viewBox="0 0 1600 260" preserveAspectRatio="none">
        <g>
          <path d="M0 173C166 98 280 220 430 154s264 75 421 7 287 68 457 2 231 31 292 20" />
          <path d="M0 197c164-62 276 32 436-18s269 56 420 5 282 50 448 2 233 15 296 12" />
          <path d="M0 224c183-41 286 17 449-13s266 31 421 4 291 27 446 1 217 8 284 10" />
        </g>
        <g className={styles.surfaceGrid}>
          {Array.from({ length: 23 }, (_, index) => (
            <path d={`M${index * 74 - 40} 260 800 110 ${index * 74 + 40} 260`} key={index} />
          ))}
        </g>
      </svg>
    </div>
  );
}
