import type { MotionStyle, MotionValue } from "framer-motion";
import { DavidVisual } from "./DavidVisual";
import { EditorialBeam } from "./EditorialBeam";
import { KnowledgeFragments } from "./KnowledgeFragments";
import { OperatorArchitecture } from "./OperatorArchitecture";
import type { Locale } from "@/lib/i18n";
import styles from "./hero.module.css";

interface HeroSceneProps {
  architectureStyle?: MotionStyle;
  beamStyle?: MotionStyle;
  davidStyle?: MotionStyle;
  fragmentStyle?: MotionStyle;
  reducedMotion: boolean;
  structureX?: MotionValue<number>;
  structureY?: MotionValue<number>;
  locale: Locale;
}

export function HeroScene({
  architectureStyle,
  beamStyle,
  davidStyle,
  fragmentStyle,
  reducedMotion,
  structureX,
  structureY,
  locale,
}: HeroSceneProps) {
  return (
    <div className={styles.scene} id="hero-operator-visual">
      <KnowledgeFragments reducedMotion={reducedMotion} scrollStyle={fragmentStyle} locale={locale} />
      <DavidVisual
        reducedMotion={reducedMotion}
        scrollStyle={davidStyle}
        structureX={structureX}
        structureY={structureY}
      />
      <EditorialBeam reducedMotion={reducedMotion} scrollStyle={beamStyle} />
      <OperatorArchitecture reducedMotion={reducedMotion} scrollStyle={architectureStyle} locale={locale} />
    </div>
  );
}
