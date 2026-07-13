import Image from "next/image";
import styles from "./hero.module.css";

export function DavidSculpture() {
  return (
    <div className={styles.sculpture} aria-hidden="true">
      <div className={styles.sculptureHalo} />
      <Image
        alt=""
        className={styles.davidImage}
        height={1536}
        preload
        sizes="(max-width: 700px) 92vw, (max-width: 1100px) 58vw, 48vw"
        src="/images/david-base.webp"
        width={1024}
      />
      <div className={styles.sculptureFade} />
    </div>
  );
}
