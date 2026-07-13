import styles from "./hero.module.css";

export function EditorialBeam() {
  return (
    <div className={styles.beam} aria-hidden="true">
      <span className={styles.beamGlow} />
      <span className={styles.beamCore} />
      <span className={styles.beamTopLabel}>KNOWLEDGE</span>
      <span className={styles.beamBottomLabel}>OPERATOR</span>
    </div>
  );
}
