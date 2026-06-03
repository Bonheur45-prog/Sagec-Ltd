import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { servicesCTA } from '@data/services'
import styles from './ServicesCTA.module.css'

const leftVariants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

const rightVariants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
}

export default function ServicesCTA() {
  return (
    <section className={styles.section} aria-labelledby="services-cta-heading">

      <div className={styles.accentTopRight}  aria-hidden="true" />
      <div className={styles.accentBottomLeft} aria-hidden="true" />

      <div className={styles.container}>

        {/* Left */}
        <motion.div
          className={styles.textSide}
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className={styles.eyebrow}>Work With Us</span>
          <h2 id="services-cta-heading" className={styles.heading}>
            {servicesCTA.heading}
          </h2>
          <div className={styles.accentLine} aria-hidden="true" />
          <p className={styles.subline}>{servicesCTA.subline}</p>
        </motion.div>

        {/* Right */}
        <motion.div
          className={styles.buttonSide}
          variants={rightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <Link to={servicesCTA.primaryBtn.link} className={styles.btnPrimary}>
            {servicesCTA.primaryBtn.label}
          </Link>
          <Link to={servicesCTA.secondaryBtn.link} className={styles.btnSecondary}>
            {servicesCTA.secondaryBtn.label}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}