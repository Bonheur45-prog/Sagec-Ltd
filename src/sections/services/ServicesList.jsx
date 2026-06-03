import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { services } from '@data/services'
import styles from './ServicesList.module.css'

// ── ANIMATION VARIANTS ─────────────────────────────────────

const slideLeft = {
  hidden:  { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const slideRight = {
  hidden:  { opacity: 0, x: 56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const slideUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

// ── CHECKMARK ICON ─────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="#F26522" strokeWidth="1.4"/>
      <path d="M5 8l2 2 4-4" stroke="#F26522" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── INDIVIDUAL SERVICE BLOCK ───────────────────────────────

function ServiceBlock({ service, index }) {
  const isOdd   = index % 2 === 0        // odd index = image left
  const bgClass = isOdd ? styles.bgLight : styles.bgGrey
  const number  = String(index + 1).padStart(2, '0')

  return (
    <div
      className={`${styles.block} ${bgClass}`}
      id={service.slug}
    >
      <div className={styles.blockInner}>

        {/* ── IMAGE ─────────────────────── */}
        <motion.div
          className={`${styles.imageCol} ${isOdd ? styles.imageLeft : styles.imageRight}`}
          variants={isOdd ? slideLeft : slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className={styles.imageWrapper}>
            <img
              src={service.image}
              alt={service.title}
              className={styles.image}
              loading="lazy"
            />
            {/* Orange number badge */}
            <div className={styles.numberBadge} aria-hidden="true">
              {number}
            </div>
          </div>
        </motion.div>

        {/* ── CONTENT ───────────────────── */}
        <motion.div
          className={styles.contentCol}
          variants={isOdd ? slideRight : slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Eyebrow */}
          <p className={styles.eyebrow}>Service {number}</p>

          {/* Title */}
          <h2 className={styles.title}>{service.title}</h2>

          {/* Accent line */}
          <div className={styles.accentLine} aria-hidden="true" />

          {/* Description */}
          <p className={styles.description}>{service.description}</p>

          {/* Deliverables list */}
          <motion.ul
            className={styles.deliverables}
            variants={{
              hidden:  {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {service.deliverables.map((item, i) => (
              <motion.li
                key={i}
                className={styles.deliverable}
                variants={slideUp}
              >
                <span className={styles.checkIcon}><CheckIcon /></span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          <Link to={service.link} className={styles.cta}>
            Learn More
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.ctaArrow}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>

      </div>
    </div>
  )
}

// ── MAIN COMPONENT ─────────────────────────────────────────

export default function ServicesList() {
  return (
    <div className={styles.wrapper}>
      {services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}
    </div>
  )
}