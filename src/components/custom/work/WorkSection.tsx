import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import { getCustomContent } from "@/content/custom";
import type { Locale } from "@/lib/i18n";
import styles from "./work.module.css";

interface WorkSectionProps {
  reducedMotion: boolean;
  locale: Locale;
}

interface SceneProps {
  mobile?: boolean;
  progress?: MotionValue<number>;
  locale: Locale;
}

interface DesktopSceneProps {
  children: ReactNode;
  exitOpacity?: 0 | 1;
  progress: MotionValue<number>;
  range: [number, number, number, number];
}

interface SceneGroupProps {
  children: ReactNode;
  className: string;
  progress?: MotionValue<number>;
  range: [number, number];
}

function AnimatedSceneGroup({
  children,
  className,
  progress,
  range,
}: Required<SceneGroupProps>) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [12, 0]);

  return <motion.div className={className} style={{ opacity, y }}>{children}</motion.div>;
}

function SceneGroup(props: SceneGroupProps) {
  if (!props.progress) {
    return <div className={props.className}>{props.children}</div>;
  }

  return (
    <AnimatedSceneGroup
      className={props.className}
      progress={props.progress}
      range={props.range}
    >
      {props.children}
    </AnimatedSceneGroup>
  );
}

function SceneHeader({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: string;
}) {
  return (
    <header className={styles.sceneHeader}>
      <p data-typography="meta">
        <span>{number}</span>
        {label}
      </p>
      <h3>{title}</h3>
    </header>
  );
}

function SpreadsheetGrid() {
  return (
    <span className={styles.sheetGrid} aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
    </span>
  );
}

function CustomerRequestScene({ mobile = false, progress, locale }: SceneProps) {
  const { work } = getCustomContent(locale);
  const { customerRequestSteps, scenes } = work;

  return (
    <article className={styles.scene} data-scene="request">
      <SceneHeader
        number="01"
        label={scenes.request.label}
        title={scenes.request.title}
      />
      <div className={styles.requestTimeline}>
        <SceneGroup className={styles.requestMessage} progress={progress} range={[0.06, 0.1]}>
          <span>09:14</span>
          <small>{scenes.request.messageLabel}</small>
          <p>“{scenes.request.message}”</p>
        </SceneGroup>
        <SceneGroup className={styles.requestSteps} progress={progress} range={[0.1, 0.15]}>
          {customerRequestSteps.map((step, index) => (
            <div className={styles.requestStep} key={step.id}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              <div>
                <small>{step.meta}</small>
                <p>{step.label}</p>
                {step.id === "sheet" ? <SpreadsheetGrid /> : null}
              </div>
            </div>
          ))}
        </SceneGroup>
        <SceneGroup className={styles.waitingState} progress={progress} range={[0.15, 0.2]}>
          <span>{scenes.request.waitingLabel}</span>
          <p>{scenes.request.waitingTitle}</p>
          <small>{scenes.request.waitingMeta}</small>
        </SceneGroup>
      </div>
      {mobile ? <p className={styles.mobileOutcome}>{scenes.request.mobileOutcome}</p> : null}
    </article>
  );
}

function WeeklyReportScene({ mobile = false, progress, locale }: SceneProps) {
  const { work } = getCustomContent(locale);
  const { reportSources, scenes } = work;

  return (
    <article className={styles.scene} data-scene="report">
      <SceneHeader
        number="02"
        label={scenes.report.label}
        title={scenes.report.title}
      />
      <p className={styles.sceneTime}>{scenes.report.time}</p>
      <div className={styles.reportAssembly}>
        <SceneGroup className={styles.reportSources} progress={progress} range={[0.27, 0.31]}>
          {reportSources.map((source) => (
            <div className={styles.sourceFragment} data-kind={source.kind} key={source.id}>
              <small>{source.label}</small>
              <strong>{source.value}</strong>
              {source.kind === "sheet" ? <SpreadsheetGrid /> : <i aria-hidden="true" />}
            </div>
          ))}
        </SceneGroup>
        <SceneGroup className={styles.reportConnector} progress={progress} range={[0.31, 0.35]}>
          <i />
          <span>{scenes.report.copiedManually}</span>
        </SceneGroup>
        <SceneGroup className={styles.reportBlock} progress={progress} range={[0.32, 0.37]}>
          <small>{scenes.report.reportLabel}</small>
          <div><span /><span /><span /></div>
          <strong>{scenes.report.reportTitle}</strong>
        </SceneGroup>
      </div>
      <SceneGroup className={styles.outdatedState} progress={progress} range={[0.37, 0.41]}>
        <span>{scenes.report.outdatedLabel}</span>
        <p>{scenes.report.outdatedTitle}</p>
      </SceneGroup>
      {mobile ? <p className={styles.mobileOutcome}>{scenes.report.mobileOutcome}</p> : null}
    </article>
  );
}

function DecisionBottleneckScene({ mobile = false, progress, locale }: SceneProps) {
  const { work } = getCustomContent(locale);
  const { decisionQuestions, scenes } = work;

  return (
    <article className={styles.scene} data-scene="decision">
      <SceneHeader
        number="03"
        label={scenes.decision.label}
        title={scenes.decision.title}
      />
      <p className={styles.sceneTime}>11:26</p>
      <div className={styles.decisionMap}>
        <SceneGroup className={styles.decisionQuestions} progress={progress} range={[0.49, 0.56]}>
          {decisionQuestions.map((question) => (
            <div className={styles.decisionQuestion} key={question.id}>
              <small>{question.meta}</small>
              <p>“{question.label}”</p>
              <i aria-hidden="true" />
            </div>
          ))}
        </SceneGroup>
        <SceneGroup className={styles.onePerson} progress={progress} range={[0.56, 0.63]}>
          <small>{scenes.decision.finalAnswer}</small>
          <strong>{scenes.decision.onePerson}</strong>
          <span>{scenes.decision.waiting}</span>
        </SceneGroup>
      </div>
      {mobile ? <p className={styles.mobileOutcome}>{scenes.decision.mobileOutcome}</p> : null}
    </article>
  );
}

function OperatorFlowScene({ progress, locale }: Pick<SceneProps, "progress" | "locale">) {
  const { work } = getCustomContent(locale);
  const { operatorFlow, scenes } = work;

  return (
    <article className={`${styles.scene} ${styles.flowScene}`} data-scene="flow">
      <SceneHeader
        number="04"
        label={scenes.flow.label}
        title={scenes.flow.title}
      />
      <SceneGroup className={styles.operatorWorkflow} progress={progress} range={[0.7, 0.82]}>
        <p className={styles.operatorLabel}><i /> {scenes.flow.operatorLabel}</p>
        <div className={styles.flowRail}>
          {operatorFlow.map((step, index) => (
            <div className={styles.flowStep} key={step}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <strong>{step}</strong>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
      </SceneGroup>
    </article>
  );
}

function ClosingScene({ locale }: { locale: Locale }) {
  const { work } = getCustomContent(locale);
  const { scenes, workCopy } = work;

  return (
    <article className={`${styles.scene} ${styles.closingScene}`} data-scene="closing">
      <p className={styles.closingEyebrow}><span>05</span> {scenes.closing}</p>
      <div className={styles.closingCopy}>
        <p>{workCopy.closing}</p>
        <span>{workCopy.closingSupport}</span>
        <a className={styles.closingAction} href="#operator-intake">
          <span>{workCopy.closingAction}</span>
          <svg aria-hidden="true" viewBox="0 0 24 16">
            <path d="M1 8h20M15 2l6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  );
}

function DesktopScene({ children, exitOpacity = 0, progress, range }: DesktopSceneProps) {
  const opacity = useTransform(progress, range, [0, 1, 1, exitOpacity]);
  const y = useTransform(
    progress,
    [range[0], range[1], range[2], range[3]],
    [14, 0, 0, exitOpacity === 1 ? 0 : -10],
  );
  const sceneStyle: MotionStyle = { opacity, y };

  return (
    <motion.div className={styles.desktopScene} style={sceneStyle}>
      {children}
    </motion.div>
  );
}

function SceneIndex({ progress, locale }: { progress: MotionValue<number>; locale: Locale }) {
  const { work } = getCustomContent(locale);
  const { sceneLabels } = work;
  const markerTop = useTransform(
    progress,
    [0, 0.23, 0.27, 0.44, 0.48, 0.66, 0.7, 0.85, 0.89, 1],
    ["0%", "0%", "25%", "25%", "50%", "50%", "75%", "75%", "100%", "100%"],
  );

  return (
    <div className={styles.sceneIndex} aria-hidden="true">
      <motion.i style={{ top: markerTop }} />
      {sceneLabels.map((scene) => (
        <p key={scene.id}><span>{scene.number}</span>{scene.label}</p>
      ))}
    </div>
  );
}

function MobileScenes({ reducedMotion, locale }: WorkSectionProps) {
  const reveal = reducedMotion
    ? undefined
    : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <div className={styles.mobileFlow}>
      <motion.div {...reveal} viewport={{ amount: 0.22, once: true }}>
        <CustomerRequestScene mobile locale={locale} />
      </motion.div>
      <motion.div {...reveal} viewport={{ amount: 0.22, once: true }}>
        <WeeklyReportScene mobile locale={locale} />
      </motion.div>
      <motion.div {...reveal} viewport={{ amount: 0.22, once: true }}>
        <DecisionBottleneckScene mobile locale={locale} />
      </motion.div>
      <motion.div {...reveal} viewport={{ amount: 0.22, once: true }}>
        <OperatorFlowScene progress={undefined} locale={locale} />
      </motion.div>
      <motion.div {...reveal} viewport={{ amount: 0.22, once: true }}>
        <ClosingScene locale={locale} />
      </motion.div>
    </div>
  );
}

export function WorkSection({ reducedMotion, locale }: WorkSectionProps) {
  const { work } = getCustomContent(locale);
  const { workCopy } = work;
  const sectionRef = useRef<HTMLElement>(null);
  const entryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: entryProgress } = useScroll({
    target: entryRef,
    offset: ["start start", "end start"],
  });
  const lightOpacity = useTransform(entryProgress, [0, 1], [0, 1]);
  const headerOpacity = useTransform(entryProgress, [0.22, 1], [0, 1]);
  const headerY = useTransform(entryProgress, [0.22, 1], [18, 0]);
  const carryOpacity = useTransform(entryProgress, [0, 1], [0.7, 0]);
  const headerStyle: MotionStyle | undefined = reducedMotion
    ? undefined
    : { opacity: headerOpacity, y: headerY };

  return (
    <motion.section
      className={styles.work}
      data-nav-theme="light"
      id="work"
      aria-labelledby="work-title"
      ref={sectionRef}
    >
      <div className={styles.entryTrack} aria-hidden="true" ref={entryRef} />
      <motion.div
        className={styles.lightBackdrop}
        aria-hidden="true"
        style={reducedMotion ? undefined : { opacity: lightOpacity }}
      >
        <div className={styles.paperTexture} />
      </motion.div>
      <motion.div
        className={styles.carryLine}
        aria-hidden="true"
        style={reducedMotion ? undefined : { opacity: carryOpacity }}
      />
      <div className={styles.stickyViewport}>
        <div className={styles.layout}>
          <motion.header className={styles.copy} style={headerStyle}>
            <p className={styles.eyebrow} data-typography="meta">{workCopy.eyebrow}</p>
            <h2 id="work-title" data-typography="section-title">
              <span>{workCopy.headlineLead}</span>
              <span>{workCopy.headlineClose}</span>
            </h2>
            <div className={styles.supportingCopy} data-typography="body">
              <p>{workCopy.supporting}</p>
              <p>{workCopy.supportingClose}</p>
            </div>
          </motion.header>

          <div className={styles.desktopStage}>
            <SceneIndex progress={scrollYProgress} locale={locale} />
            <DesktopScene progress={scrollYProgress} range={[0.05, 0.09, 0.23, 0.27]}>
              <CustomerRequestScene progress={scrollYProgress} locale={locale} />
            </DesktopScene>
            <DesktopScene progress={scrollYProgress} range={[0.25, 0.29, 0.44, 0.48]}>
              <WeeklyReportScene progress={scrollYProgress} locale={locale} />
            </DesktopScene>
            <DesktopScene progress={scrollYProgress} range={[0.46, 0.5, 0.66, 0.7]}>
              <DecisionBottleneckScene progress={scrollYProgress} locale={locale} />
            </DesktopScene>
            <DesktopScene progress={scrollYProgress} range={[0.68, 0.72, 0.85, 0.89]}>
              <OperatorFlowScene progress={scrollYProgress} locale={locale} />
            </DesktopScene>
            <DesktopScene exitOpacity={1} progress={scrollYProgress} range={[0.87, 0.91, 0.98, 1]}>
              <ClosingScene locale={locale} />
            </DesktopScene>
          </div>
        </div>
      </div>
      <MobileScenes reducedMotion={reducedMotion} locale={locale} />
    </motion.section>
  );
}
