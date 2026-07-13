import styles from "./hero.module.css";

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  );
}

export function HeroActions() {
  return (
    <div className={styles.actions}>
      <a className={styles.primaryAction} href="#operator-intake">
        <span>Explore Your Operator</span>
        <ArrowUpRight />
      </a>
      <a className={styles.secondaryAction} href="#how-operators-work">
        <span>See How Operators Work</span>
        <ArrowUpRight />
      </a>
    </div>
  );
}
