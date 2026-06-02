import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { milestones } from '@data/about'
import styles from './Timeline.module.css'

// ── ANIMATION VARIANTS ─────────────────────────────────────

const headingVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const milestoneVariants = {
  hidden:  { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── MILESTONE ITEM ─────────────────────────────────────────

function MilestoneItem({ milestone, index }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      className={`${styles.milestone} ${isLeft ? styles.milestoneLeft : styles.milestoneRight}`}
      variants={milestoneVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Content block */}
      <div className={styles.contentArea}>
        <span className={styles.year}>{milestone.year}</span>
        <span className={styles.badge}>{milestone.badge}</span>
        <h3 className={styles.title}>{milestone.title}</h3>
        <p className={styles.description}>{milestone.description}</p>
      </div>

      {/* Center circle with SAGEC logo */}
      <div className={styles.circleArea}>
        <div className={styles.circle} aria-hidden="true">
          <img
            src="/logo-color.png"
            alt=""
            className={styles.circleLogo}
          />
        </div>
      </div>

      {/* Empty side (hidden on mobile) */}
      <div className={styles.emptyArea} aria-hidden="true" />
    </motion.div>
  )
}

// ── MAIN TIMELINE SECTION ──────────────────────────────────

export default function Timeline() {
  const sectionRef = useRef(null)

  // Parallax — same technique as Services section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="timeline-heading"
    >
      {/* ── PARALLAX BACKGROUND ─────────────── */}
      <motion.div
        className={styles.parallaxBg}
        style={{ y: backgroundY }}
        aria-hidden="true"
      >
        <div className={styles.bgImage} />
        <div className={styles.bgOverlay} />
      </motion.div>

      {/* ── CONTENT ─────────────────────────── */}
      <div className={styles.content}>

        {/* Section header */}
        <motion.div
          className={styles.header}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className={styles.eyebrow}>Our Journey</span>
          <h2 id="timeline-heading" className={styles.heading}>
            Milestones That Define Us
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className={styles.timelineWrapper}>

          {/* Vertical center line */}
          <div className={styles.centerLine} aria-hidden="true" />

          {/* Milestones */}
          {milestones.map((milestone, i) => (
            <MilestoneItem
              key={milestone.id}
              milestone={milestone}
              index={i}
            />
          ))}

        </div>
      </div>
    </section>
  )
}