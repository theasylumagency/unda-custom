import { DavidSculpture } from "./DavidSculpture";
import { EditorialBeam } from "./EditorialBeam";
import { KnowledgeFragments } from "./KnowledgeFragments";
import styles from "./hero.module.css";

export function HeroScene() {
  return (
    <div className={styles.scene} id="how-operators-work">
      <p className={styles.sceneCaption}>
        <span>01</span>
        Built from the way you work
      </p>
      <KnowledgeFragments />
      <EditorialBeam />
      <DavidSculpture />
      <div className={styles.coordinate} aria-hidden="true">
        <span>YOUR KNOWLEDGE</span>
        <i />
        <span>YOUR OPERATOR</span>
      </div>
    </div>
  );
}
