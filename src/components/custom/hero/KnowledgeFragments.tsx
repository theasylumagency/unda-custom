import { knowledgeFragments } from "./hero-data";
import styles from "./hero.module.css";

export function KnowledgeFragments() {
  return (
    <div className={styles.fragments} aria-hidden="true">
      {knowledgeFragments.map((fragment, index) => (
        <span
          className={`${styles.fragment} ${styles[fragment.className]}`}
          key={fragment.label}
          style={{ "--fragment-index": index } as React.CSSProperties}
        >
          {fragment.label}
        </span>
      ))}
    </div>
  );
}
