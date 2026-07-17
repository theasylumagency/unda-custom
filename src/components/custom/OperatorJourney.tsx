"use client";

import {
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { WhenRulesSection } from "./approach/WhenRulesSection";
import { CustomHero } from "./hero/CustomHero";
import { OperatorProfilesSection } from "./operators/OperatorProfilesSection";
import { StartWithWorkSection } from "./intake/StartWithWorkSection";
import { WorkSection } from "./work/WorkSection";
import styles from "./operator-journey.module.css";

import type { Locale } from "@/lib/i18n";

export function OperatorJourney({ locale }: { locale: Locale }) {
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollY } = useScroll();
  const transitionProgress = useTransform(scrollY, (position) => {
    const viewportHeight = typeof window === "undefined" ? 1 : window.innerHeight;
    return Math.min(Math.max(position / viewportHeight, 0), 1);
  });
  const copyOpacity = useTransform(transitionProgress, [0, 0.66, 0.94, 1], [1, 1, 0.54, 0.22]);
  const copyY = useTransform(transitionProgress, [0, 0.64, 1], [0, 0, -22]);
  const davidOpacity = useTransform(transitionProgress, [0, 0.34, 0.78, 1], [1, 1, 0.48, 0.04]);
  const davidX = useTransform(transitionProgress, [0, 0.3, 0.78, 1], [0, 0, 74, 132]);
  const davidY = useTransform(transitionProgress, [0, 0.42, 1], [0, 0, -20]);
  const davidScale = useTransform(transitionProgress, [0, 0.5, 1], [1, 1, 0.965]);
  const structureX = useTransform(transitionProgress, [0, 0.38, 1], [0, 0, -28]);
  const structureY = useTransform(transitionProgress, [0, 0.44, 1], [0, 0, -12]);
  const fragmentOpacity = useTransform(transitionProgress, [0, 0.38, 0.78, 0.94], [1, 1, 0.72, 0]);
  const fragmentX = useTransform(transitionProgress, [0, 0.34, 0.72, 0.96], [0, 0, 42, 108]);
  const architectureOpacity = useTransform(transitionProgress, [0, 0.68, 0.94, 1], [1, 1, 0.48, 0]);
  const architectureX = useTransform(transitionProgress, [0, 0.62, 1], [0, 0, 26]);
  const beamOpacity = useTransform(transitionProgress, [0, 0.7, 1], [1, 1, 0.48]);

  const copyStyle: MotionStyle | undefined = reducedMotion
    ? undefined
    : { opacity: copyOpacity, y: copyY };
  const davidStyle: MotionStyle | undefined = reducedMotion
    ? undefined
    : { opacity: davidOpacity, scale: davidScale, x: davidX, y: davidY };
  const fragmentStyle: MotionStyle | undefined = reducedMotion
    ? undefined
    : { opacity: fragmentOpacity, x: fragmentX };
  const architectureStyle: MotionStyle | undefined = reducedMotion
    ? undefined
    : { opacity: architectureOpacity, x: architectureX };
  const beamStyle: MotionStyle | undefined = reducedMotion
    ? undefined
    : { opacity: beamOpacity };

  return (
    <div className={styles.journey}>
      <CustomHero
        architectureStyle={architectureStyle}
        beamStyle={beamStyle}
        copyStyle={copyStyle}
        davidStyle={davidStyle}
        fragmentStyle={fragmentStyle}
        reducedMotion={reducedMotion}
        structureX={reducedMotion ? undefined : structureX}
        structureY={reducedMotion ? undefined : structureY}
        locale={locale}
      />
      <WorkSection reducedMotion={reducedMotion} locale={locale} />
      <WhenRulesSection reducedMotion={reducedMotion} locale={locale} />
      <OperatorProfilesSection reducedMotion={reducedMotion} locale={locale} />
      <StartWithWorkSection reducedMotion={reducedMotion} locale={locale} />
    </div>
  );
}
