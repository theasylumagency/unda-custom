import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import styles from "./approach.module.css";

interface WhenRulesSectionProps {
  reducedMotion: boolean;
  locale: Locale;
}

interface DesktopSceneProps {
  children: ReactNode;
  enterOpacity?: 0 | 1;
  exitOpacity?: 0 | 1;
  progress: MotionValue<number>;
  range: [number, number, number, number];
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function FrictionVisual({ label, locale }: { label: string; locale: Locale }) {
  const { approach } = getCustomContent(locale);
  const { frictionSignals, visuals } = approach;

  return (
    <div className={`${styles.stepVisual} ${styles.frictionVisual}`} role="img" aria-label={label}>
      <motion.div className={styles.signalField} variants={itemVariants}>
        {frictionSignals.map((signal, index) => (
          <span className={styles.frictionSignal} data-position={index + 1} key={signal}>
            <i aria-hidden="true" />
            {signal}
          </span>
        ))}
      </motion.div>
      <motion.div className={styles.brokenFlow} variants={itemVariants}>
        <span>{visuals.friction.enters}</span>
        <i aria-hidden="true" />
        <b aria-hidden="true" />
        <i aria-hidden="true" />
        <span>{visuals.friction.stops}</span>
      </motion.div>
      <motion.p className={styles.visualOutcome} variants={itemVariants}>
        <i aria-hidden="true" /> {visuals.friction.found}
      </motion.p>
    </div>
  );
}

function ApproachVisual({ label, locale }: { label: string; locale: Locale }) {
  const { approach } = getCustomContent(locale);
  const { approachPaths, visuals } = approach;

  return (
    <div className={`${styles.stepVisual} ${styles.approachVisual}`} role="img" aria-label={label}>
      <motion.p className={styles.visualQuestion} variants={itemVariants}>
        {visuals.approach.question}
      </motion.p>
      <div className={styles.approachPaths}>
        {approachPaths.map((path) => (
          <motion.div className={styles.approachPath} data-path={path.id} key={path.id} variants={itemVariants}>
            <div>
              <strong>{path.title}</strong>
              <span>{path.description}</span>
            </div>
            <i aria-hidden="true"><b /></i>
          </motion.div>
        ))}
      </div>
      <motion.p className={styles.approachNote} variants={itemVariants}>
        {visuals.approach.note}
      </motion.p>
    </div>
  );
}

function RoleVisual({ label, locale }: { label: string; locale: Locale }) {
  const { approach } = getCustomContent(locale);
  const { roleBoundaries, visuals } = approach;

  return (
    <div className={`${styles.stepVisual} ${styles.roleVisual}`} role="img" aria-label={label}>
      <motion.div className={styles.roleFrame} variants={itemVariants}>
        {roleBoundaries.map((boundary, index) => (
          <span data-boundary={index + 1} key={boundary}>{boundary}</span>
        ))}
        <div className={styles.definedRole}>
          <small>{visuals.role.definedRole}</small>
          <strong>
            {visuals.role.operatorName.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </strong>
          <i aria-hidden="true" />
        </div>
      </motion.div>
      <motion.div className={styles.humanBoundary} variants={itemVariants}>
        <span>{visuals.role.mayAct}</span>
        <i aria-hidden="true" />
        <span>{visuals.role.humanDecides}</span>
      </motion.div>
    </div>
  );
}

function BuildVisual({ label, locale }: { label: string; locale: Locale }) {
  const { approach } = getCustomContent(locale);
  const { businessSystems, visuals } = approach;

  return (
    <div className={`${styles.stepVisual} ${styles.buildVisual}`} role="img" aria-label={label}>
      <motion.div className={styles.systemMap} variants={itemVariants}>
        {businessSystems.map((system, index) => (
          <span data-system={index + 1} key={system}>{system}<i aria-hidden="true" /></span>
        ))}
        <div className={styles.operationalRole}>
          <small>{visuals.build.operationalRole}</small>
          <strong>{visuals.build.customOperator}</strong>
          <p>
            {visuals.build.description.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
        </div>
      </motion.div>
      <motion.p className={styles.buildNote} variants={itemVariants}>
        {visuals.build.note}
      </motion.p>
    </div>
  );
}

function StepVisual({ id, label, locale }: { id: string; label: string; locale: Locale }) {
  switch (id) {
    case "find-friction":
      return <FrictionVisual label={label} locale={locale} />;
    case "choose-approach":
      return <ApproachVisual label={label} locale={locale} />;
    case "define-role":
      return <RoleVisual label={label} locale={locale} />;
    case "build-operator":
      return <BuildVisual label={label} locale={locale} />;
  }
}

function MethodScene({ step, locale }: { step: { id: string; number: string; label: string; title: string; body: string; visualLabel: string }; locale: Locale }) {
  return (
    <article className={styles.scene} data-scene={step.id}>
      <div className={styles.sceneCopy}>
        <motion.p className={styles.stepLabel} data-typography="meta" variants={itemVariants}>
          <span>{step.number}</span> / {step.label}
        </motion.p>
        <motion.h3 variants={itemVariants}>{step.title}</motion.h3>
        <motion.p className={styles.stepBody} data-typography="body" variants={itemVariants}>{step.body}</motion.p>
      </div>
      <StepVisual id={step.id} label={step.visualLabel} locale={locale} />
    </article>
  );
}

function ResultContent({ locale }: { locale: Locale }) {
  const { approach } = getCustomContent(locale);
  const { approachCopy, roleDefinition } = approach;

  return (
    <div className={styles.resultContent}>
      <div className={styles.resultCopy}>
        <motion.p variants={itemVariants}>{approachCopy.resultLead}</motion.p>
        <motion.p variants={itemVariants}>{approachCopy.resultClose}</motion.p>
      </div>
      <motion.dl className={styles.roleDefinition} variants={itemVariants}>
        {roleDefinition.map(([term, description]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
}

function DesktopScene({
  children,
  enterOpacity = 0,
  exitOpacity = 0,
  progress,
  range,
}: DesktopSceneProps) {
  const opacity = useTransform(progress, range, [enterOpacity, 1, 1, exitOpacity]);
  const y = useTransform(
    progress,
    range,
    [enterOpacity === 1 ? 0 : 12, 0, 0, exitOpacity === 1 ? 0 : -10],
  );
  const visibility = useTransform(progress, (value) => {
    const hasNotEntered = value < range[0];
    const hasExited = exitOpacity === 0 && value >= range[3];

    return hasNotEntered || hasExited ? "hidden" : "visible";
  });
  const sceneStyle: MotionStyle = { opacity, visibility, y };

  return <motion.div className={styles.desktopScene} style={sceneStyle}>{children}</motion.div>;
}

function MethodIndex({ progress, locale }: { progress: MotionValue<number>; locale: Locale }) {
  const { approach } = getCustomContent(locale);
  const { methodSteps } = approach;
  
  const markerLeft = useTransform(
    progress,
    [0, 0.19, 0.23, 0.39, 0.43, 0.59, 0.63, 0.79, 0.83, 1],
    ["0%", "0%", "25%", "25%", "50%", "50%", "75%", "75%", "100%", "100%"],
  );

  return (
    <div className={styles.methodIndex} aria-hidden="true">
      <motion.i style={{ left: markerLeft }} />
      {methodSteps.map((step) => <p key={step.id}>{step.number}<span>{step.label}</span></p>)}
      <p>05<span>{approach.visuals.role.definedRole}</span></p>
    </div>
  );
}

function MobileMethod({ reducedMotion, locale }: WhenRulesSectionProps) {
  const { approach } = getCustomContent(locale);
  const { methodSteps } = approach;
  return (
    <div className={styles.mobileMethod}>
      {methodSteps.map((step) => (
        <motion.div
          key={step.id}
          initial={reducedMotion ? false : "hidden"}
          variants={revealVariants}
          viewport={{ amount: 0.2, once: true }}
          whileInView={reducedMotion ? undefined : "visible"}
        >
          <MethodScene step={step} locale={locale} />
        </motion.div>
      ))}
      <motion.div
        className={styles.mobileResult}
        initial={reducedMotion ? false : "hidden"}
        variants={revealVariants}
        viewport={{ amount: 0.25, once: true }}
        whileInView={reducedMotion ? undefined : "visible"}
      >
        <ResultContent locale={locale} />
      </motion.div>
    </div>
  );
}

export function WhenRulesSection({ reducedMotion, locale }: WhenRulesSectionProps) {
  const { approach } = getCustomContent(locale);
  const { approachCopy, methodSteps } = approach;
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className={styles.approach} data-nav-theme="light" id="approach" aria-labelledby="approach-title">
      <div className={styles.methodTrack} ref={trackRef}>
        <div className={styles.carryLine} aria-hidden="true"><i /></div>
        <div className={styles.stickyViewport}>
          <div className={styles.splitLayout}>
            <motion.header
              className={styles.staticCopy}
              initial={reducedMotion ? false : "hidden"}
              variants={revealVariants}
              viewport={{ amount: 0.35, once: true }}
              whileInView={reducedMotion ? undefined : "visible"}
            >
              <motion.p className={styles.eyebrow} data-typography="meta" variants={itemVariants}>{approachCopy.eyebrow}</motion.p>
              <h2 id="approach-title" data-typography="section-title">
                <motion.span variants={itemVariants}>{approachCopy.headlineLead}</motion.span>
                <motion.span variants={itemVariants}>{approachCopy.headlineClose}</motion.span>
              </h2>
              <motion.p className={styles.transition} variants={itemVariants}>{approachCopy.transition}</motion.p>
            </motion.header>

            <div className={styles.desktopStage}>
              <MethodIndex progress={scrollYProgress} locale={locale} />
              <DesktopScene enterOpacity={1} progress={scrollYProgress} range={[0, 0.04, 0.19, 0.23]}>
                <MethodScene step={methodSteps[0]} locale={locale} />
              </DesktopScene>
              <DesktopScene progress={scrollYProgress} range={[0.2, 0.24, 0.39, 0.43]}>
                <MethodScene step={methodSteps[1]} locale={locale} />
              </DesktopScene>
              <DesktopScene progress={scrollYProgress} range={[0.4, 0.44, 0.59, 0.63]}>
                <MethodScene step={methodSteps[2]} locale={locale} />
              </DesktopScene>
              <DesktopScene progress={scrollYProgress} range={[0.6, 0.64, 0.79, 0.83]}>
                <MethodScene step={methodSteps[3]} locale={locale} />
              </DesktopScene>
              <DesktopScene exitOpacity={1} progress={scrollYProgress} range={[0.8, 0.84, 0.98, 1]}>
                <ResultContent locale={locale} />
              </DesktopScene>
            </div>
          </div>
        </div>
      </div>

      <MobileMethod reducedMotion={reducedMotion} locale={locale} />


    </section>
  );
}
