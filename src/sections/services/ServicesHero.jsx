import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './ServicesHero.module.css'

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function ServicesHero() {
  return (
    <section className={styles.hero} aria-label="Our Services">

      {/* Background */}
      <div className={styles.background} aria-hidden="true">
        <img
          src="/images/services/services-bg.jpg"
          alt=""
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.nav
            className={styles.breadcrumb}
            variants={itemVariants}
            aria-label="Breadcrumb"
          >
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent}>Services</span>
          </motion.nav>

          {/* Eyebrow */}
          <motion.p className={styles.eyebrow} variants={itemVariants}>
            What We Offer
          </motion.p>

          {/* Headline */}
          <motion.h1 className={styles.headline} variants={itemVariants}>
            Our Services
          </motion.h1>

          {/* Accent line */}
          <motion.div
            className={styles.accentLine}
            variants={{
              hidden:  { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
              },
            }}
            style={{ transformOrigin: 'left' }}
            aria-hidden="true"
          />

          {/* Subline */}
          <motion.p className={styles.subline} variants={itemVariants}>
            From architectural design to full construction management —
            every discipline under one roof.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden="true"
      >
        <motion.span
          className={styles.scrollLine}
          style={{ transformOrigin: 'top' }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 1.4 }}
        />
      </motion.div>

    </section>
  )
}