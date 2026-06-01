// src/sections/about/MissionVision/index.jsx
import { motion } from "framer-motion";
import { useInView } from "@hooks/useInView";
import { missionVision } from "@data/about";
import styles from "./MissionVision.module.css";

// ─── Animation variants ────────────────────────────────────────
const headerVariant = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Each block fades up independently — delay controls the stagger
const blockVariant = (delay) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

// ─── Compass SVG icon — spins continuously via CSS ────────────
function CompassIcon() {
  return (
    <svg
      className={`${styles.icon} ${styles.iconSpin}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="12" cy="12" r="10" />
      {/* Compass needle — N (filled tip) pointing up */}
      <polygon points="12,2 14.5,12 12,10 9.5,12" fill="currentColor" stroke="none" />
      {/* Compass needle — S (outline) pointing down */}
      <polygon
        points="12,22 9.5,12 12,14 14.5,12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {/* Centre pivot dot */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── Telescope SVG icon — static ──────────────────────────────
function TelescopeIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {/* Main barrel top + bottom edges */}
      <line x1="2" y1="10" x2="16" y2="5" />
      <line x1="2" y1="14" x2="16" y2="19" />
      {/* Eyepiece (left cap) */}
      <line x1="2" y1="10" x2="2" y2="14" />
      {/* Objective lens (right cap) */}
      <path d="M16 5 Q18 12 16 19" />
      {/* Tripod legs */}
      <line x1="9" y1="17" x2="7"  y2="22" />
      <line x1="9" y1="17" x2="11" y2="22" />
      <line x1="9" y1="17" x2="9"  y2="12" />
      {/* Lens circle */}
      <circle cx="16" cy="12" r="3" />
      {/* Glint line */}
      <line x1="18.5" y1="9.5" x2="20" y2="8" />
    </svg>
  );
}

// ─── Single Mission or Vision block ───────────────────────────
// Uses data shape: { eyebrow, heading, text }
function Block({ data, icon, delay }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={styles.block}
      variants={blockVariant(delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Icon */}
      <div className={styles.iconWrap} aria-hidden="true">
        {icon}
      </div>

      {/* Eyebrow label */}
      <span className={styles.blockLabel}>{data.eyebrow}</span>

      {/* Block heading */}
      <h3 className={styles.blockHeading}>{data.heading}</h3>

      {/* Main text */}
      <p className={styles.blockText}>{data.text}</p>
    </motion.div>
  );
}

// ─── Centre divider — vertical line + orange diamond ──────────
function Divider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span className={styles.diamond} />
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────
export default function MissionVision() {
  return (
    <section
      className={styles.section}
      aria-labelledby="mv-heading"
    >
      <div className={styles.container}>

        {/* Section header */}
        <motion.div
          className={styles.header}
          variants={headerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <span className={styles.eyebrow}>Who We Are</span>
          <h2 className={styles.heading} id="mv-heading">
            Our <span>Purpose</span>
          </h2>
        </motion.div>

        {/* Mission + Divider + Vision — plain div, each block animates independently */}
        <div className={styles.body}>

          <Block
            data={missionVision.mission}
            icon={<CompassIcon />}
            delay={0}
          />

          <Divider />

          <Block
            data={missionVision.vision}
            icon={<TelescopeIcon />}
            delay={0.18}
          />

        </div>

      </div>
    </section>
  );
}