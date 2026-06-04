import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projectsCTA } from '@data/projects'
import styles from './ProjectsCTA.module.css'

const leftVariants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

const rightVariants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
}

export default function ProjectsCTA() {
  return (
    <section className={styles.section} aria-labelledby="projects-cta-heading">
      <div className={styles.accentTopRight}  aria-hidden="true" />
      <div className={styles.accentBottomLeft} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.textSide}
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className={styles.eyebrow}>Work With Us</span>
          <h2 id="projects-cta-heading" className={styles.heading}>
            {projectsCTA.heading}
          </h2>
          <div className={styles.accentLine} aria-hidden="true" />
          <p className={styles.subline}>{projectsCTA.subline}</p>
        </motion.div>

        <motion.div
          className={styles.buttonSide}
          variants={rightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <Link to={projectsCTA.primaryBtn.link} className={styles.btnPrimary}>
            {projectsCTA.primaryBtn.label}
          </Link>
          <Link to={projectsCTA.secondaryBtn.link} className={styles.btnSecondary}>
            {projectsCTA.secondaryBtn.label}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}