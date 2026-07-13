import { HeroActions } from "./HeroActions";
import styles from "./hero.module.css";

export function HeroCopy() {
  return (
    <div className={styles.copy}>
      <p className={styles.eyebrow}>
        <span aria-hidden="true" />
        Custom AI Operators
      </p>

      <h1 className={styles.headline} id="hero-title">
        You already know how your business should work.
        <span>We turn that knowledge into an AI operator built around you.</span>
      </h1>

      <p className={styles.supportingCopy}>
        An operator shaped by your processes, rules and systems — designed to
        understand context, carry out defined work and operate within the
        boundaries you set.
      </p>

      <HeroActions />

      <p className={styles.microcopy} id="operator-intake">
        <span aria-hidden="true">✦</span>
        Start with a process, problem or recurring task. No technical brief
        required.
      </p>
    </div>
  );
}
