import styles from "./hero.module.css";

export function HeroScrollTransition() {
  return (
    <div className={styles.scrollTransition} aria-hidden="true">
      <span>Built around you</span>
      <svg viewBox="0 0 12 22">
        <path d="M6 1v19M1 15l5 5 5-5" />
      </svg>
    </div>
  );
}
