import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
  type Variants,
} from "framer-motion";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import styles from "./operator-profiles.module.css";

interface OperatorProfilesSectionProps {
  reducedMotion: boolean;
  locale: Locale;
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
  },
};

function ProfileDetails({ details }: { details: readonly { term: string; description: string }[] }) {
  return (
    <motion.dl className={styles.profileDetails} data-typography="body" variants={itemVariants}>
      {details.map((detail) => (
        <div key={detail.term}>
          <dt>{detail.term}</dt>
          <dd>{detail.description}</dd>
        </div>
      ))}
    </motion.dl>
  );
}

function SocialCycleVisual({ label, locale }: { label: string; locale: Locale }) {
  const { operators } = getCustomContent(locale);
  const { socialCycle, visuals } = operators;

  return (
    <div className={`${styles.profileVisual} ${styles.socialVisual}`} role="img" aria-label={label}>
      <motion.div className={styles.cycleField} variants={itemVariants}>
        <i className={styles.cycleOrbit} aria-hidden="true" />
        {socialCycle.map((step, index) => (
          <motion.div
            className={styles.cycleStep}
            data-human={"human" in step && step.human ? "true" : undefined}
            data-position={index + 1}
            key={step.id}
            variants={itemVariants}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.label}</strong>
            <i aria-hidden="true" />
          </motion.div>
        ))}
        <motion.div className={styles.cycleCenter} variants={itemVariants}>
          <small>{visuals.social.centerSub}</small>
          <strong>
            {visuals.social.centerTitle.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </strong>
          <span>
            {visuals.social.centerDesc.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </span>
        </motion.div>
        <motion.p className={styles.humanReview} variants={itemVariants}>
          <i aria-hidden="true" /> {visuals.social.humanReview}
        </motion.p>
      </motion.div>
    </div>
  );
}

function RequestFlowVisual({ label, locale }: { label: string; locale: Locale }) {
  const { operators } = getCustomContent(locale);
  const { requestFlow, visuals } = operators;

  return (
    <div className={`${styles.profileVisual} ${styles.requestVisual}`} role="img" aria-label={label}>
      <motion.p className={styles.incomingSignal} variants={itemVariants}>
        <span>09:14</span> {visuals.requests.incoming}
      </motion.p>
      <motion.div className={styles.requestRail} variants={itemVariants}>
        {requestFlow.map((step, index) => (
          <motion.div className={styles.requestStep} data-step={step.id} key={step.id} variants={itemVariants}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i aria-hidden="true" />
            <strong>{step.label}</strong>
          </motion.div>
        ))}
      </motion.div>
      <motion.div className={styles.escalationBranch} variants={itemVariants}>
        <i aria-hidden="true" />
        <div>
          <small>{visuals.requests.escalationSub}</small>
          <strong>{visuals.requests.escalationTitle}</strong>
        </div>
      </motion.div>
      <motion.p className={styles.flowOutcome} variants={itemVariants}>
        {visuals.requests.flowOutcome} <i aria-hidden="true" />
      </motion.p>
    </div>
  );
}

function ProfileVisual({ profile, locale }: { profile: { id: string; visualLabel: string }; locale: Locale }) {
  if (profile.id === "social") {
    return <SocialCycleVisual label={profile.visualLabel} locale={locale} />;
  }

  return <RequestFlowVisual label={profile.visualLabel} locale={locale} />;
}

function OperatorCard({
  profile,
  style,
  locale,
}: {
  profile: { id: string; number: string; availability: string; name: string; summary: string; details: readonly { term: string; description: string }[]; visualLabel: string };
  style?: MotionStyle;
  locale: Locale;
}) {
  const { operators } = getCustomContent(locale);
  const { visuals } = operators;

  return (
    <motion.article
      className={styles.operatorCard}
      data-profile={profile.id}
      style={style}
    >
      <div className={styles.cardHeader}>
        <motion.div className={styles.profileMeta} variants={itemVariants}>
          <p><span>{profile.number}</span> / {visuals.profileMeta}</p>
          <small>{profile.availability}</small>
        </motion.div>
        <motion.h3 variants={itemVariants}>{profile.name}</motion.h3>
        <motion.p className={styles.profileSummary} data-typography="body" variants={itemVariants}>{profile.summary}</motion.p>
      </div>
      <div className={styles.cardBody}>
        <ProfileDetails details={profile.details} />
        <ProfileVisual profile={profile} locale={locale} />
      </div>
    </motion.article>
  );
}

export function OperatorProfilesSection({ reducedMotion, locale }: OperatorProfilesSectionProps) {
  const { operators } = getCustomContent(locale);
  const { operatorProfilesCopy, operatorProfiles } = operators;

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const firstCardScale = useTransform(scrollYProgress, [0, 0.34, 0.78, 1], [1, 1, 0.965, 0.965]);
  const firstCardY = useTransform(scrollYProgress, [0, 0.34, 0.78, 1], [0, 0, -18, -18]);
  const firstCardOpacity = useTransform(scrollYProgress, [0, 0.38, 0.76, 1], [1, 1, 0.48, 0.38]);
  const secondCardY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.78, 1],
    ["104%", "104%", "0%", "0%"],
  );
  const secondCardOpacity = useTransform(scrollYProgress, [0, 0.34, 0.5, 1], [0, 0, 1, 1]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const firstCardStyle: MotionStyle | undefined = reducedMotion
    ? undefined
    : { opacity: firstCardOpacity, scale: firstCardScale, y: firstCardY };
  const secondCardStyle: MotionStyle | undefined = reducedMotion
    ? undefined
    : { opacity: secondCardOpacity, y: secondCardY };

  return (
    <section className={styles.profiles} data-nav-theme="dark" id="operator-profiles" aria-labelledby="operator-profiles-title">
      <div className={styles.stackTrack} ref={trackRef}>
        <div className={styles.transitionLine} aria-hidden="true"><i /></div>
        <div className={styles.stackViewport}>
          <div className={styles.stackLayout}>
            <motion.header
              className={styles.stackHeader}
              initial={reducedMotion ? false : "hidden"}
              variants={revealVariants}
              viewport={{ amount: 0.3, once: true }}
              whileInView={reducedMotion ? undefined : "visible"}
            >
              <motion.p className={styles.eyebrow} data-typography="meta" variants={itemVariants}>{operatorProfilesCopy.eyebrow}</motion.p>
              <h2 id="operator-profiles-title" data-typography="section-title">
                <motion.span variants={itemVariants}>{operatorProfilesCopy.headlineLead}</motion.span>
                <motion.span variants={itemVariants}>{operatorProfilesCopy.headlineClose}</motion.span>
              </h2>
              <motion.p className={styles.supporting} data-typography="body" variants={itemVariants}>{operatorProfilesCopy.supporting}</motion.p>
              <motion.div className={styles.stackClosing} variants={itemVariants}>
                <p>{operatorProfilesCopy.closingLead}</p>
                <span>{operatorProfilesCopy.closingSupport}</span>
                <a href="#operator-intake">
                  {operatorProfilesCopy.cta}<i aria-hidden="true">→</i>
                </a>
              </motion.div>
            </motion.header>

            <div className={styles.cardStage}>
              <motion.div className={styles.stackProgress} aria-hidden="true" style={{ scaleX: progressScale }} />
              <OperatorCard profile={operatorProfiles[0]} style={firstCardStyle} locale={locale} />
              <OperatorCard profile={operatorProfiles[1]} style={secondCardStyle} locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
