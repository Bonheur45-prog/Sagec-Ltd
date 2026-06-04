import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './ContactHero.module.css'

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function ContactHero() {
  return (
    <section className={styles.hero} aria-label="Contact SAGEC">

      {/* Background */}
      <div className={styles.background} aria-hidden="true">
        <img
          src="/images/contact/contact-hero.png"
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
            <span className={styles.breadcrumbCurrent}>Contact</span>
          </motion.nav>

          <motion.p className={styles.eyebrow} variants={itemVariants}>
            Reach Out
          </motion.p>

          <motion.h1 className={styles.headline} variants={itemVariants}>
            Let's Talk
          </motion.h1>

          <motion.div
            className={styles.accentLine}
            style={{ transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            aria-hidden="true"
          />

          <motion.p className={styles.subline} variants={itemVariants}>
            Tell us about your vision and our team will
            get back to you within 24 hours.
          </motion.p>
        </motion.div>
      </div>

    </section>
  )
}