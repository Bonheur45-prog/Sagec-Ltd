import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { aboutCTA } from '@data/about'
import styles from './AboutCTA.module.css'

// ── ANIMATION VARIANTS ─────────────────────────────────────

const leftVariants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

const rightVariants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
  },
}

// ── MAIN COMPONENT ─────────────────────────────────────────

export default function AboutCTA() {
  return (
    <section className={styles.section} aria-labelledby="about-cta-heading">

      {/* ── ORANGE DIAGONAL ACCENTS (CSS only) ── */}
      <div className={styles.accentTopRight}  aria-hidden="true" />
      <div className={styles.accentBottomLeft} aria-hidden="true" />

      {/* ── CONTENT ─────────────────────────── */}
      <div className={styles.container}>

        {/* Left — heading + subline */}
        <motion.div
          className={styles.textSide}
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className={styles.eyebrow}>Work With Us</span>
          <h2 id="about-cta-heading" className={styles.heading}>
            {aboutCTA.heading}
          </h2>
          <div className={styles.accentLine} aria-hidden="true" />
          <p className={styles.subline}>{aboutCTA.subline}</p>
        </motion.div>

        {/* Right — buttons */}
        <motion.div
          className={styles.buttonSide}
          variants={rightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <Link to={aboutCTA.primaryBtn.link} className={styles.btnPrimary}>
            {aboutCTA.primaryBtn.label}
          </Link>
          <Link to={aboutCTA.secondaryBtn.link} className={styles.btnSecondary}>
            {aboutCTA.secondaryBtn.label}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}