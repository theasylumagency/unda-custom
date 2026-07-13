import { HeroCopy } from "./HeroCopy";
import { HeroScene } from "./HeroScene";
import { HeroScrollTransition } from "./HeroScrollTransition";
import styles from "./hero.module.css";

function Wordmark() {
  return (
    <a className={styles.wordmark} href="#top" aria-label="unda custom home">
      <span className={styles.wordmarkSymbol} aria-hidden="true">
        u
      </span>
      <span>unda</span>
      <i />
      <small>custom</small>
    </a>
  );
}

export function CustomHero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.texture} aria-hidden="true" />

      <header className={styles.header}>
        <Wordmark />
        <div className={styles.headerMeta}>
          <span>Custom Operators</span>
          <span className={styles.availability}>
            <i aria-hidden="true" />
            Accepting projects
          </span>
        </div>
        <a className={styles.headerContact} href="#operator-intake">
          Start a conversation
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className={styles.heroGrid}>
        <HeroCopy />
        <HeroScene />
      </div>

      <HeroScrollTransition />
    </section>
  );
}
