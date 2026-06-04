import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '@data/projects'
import styles from './FeaturedProject.module.css'

const featured = projects.find((p) => p.featured) ?? projects[0]

const slideLeft = {
  hidden:  { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

const slideRight = {
  hidden:  { opacity: 0, x: 56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function FeaturedProject() {
  return (
    <section className={styles.section} aria-labelledby="featured-heading">
      <div className={styles.inner}>

        {/* 60% — Cinematic image */}
        <motion.div
          className={styles.imageCol}
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={styles.imageWrapper}>
            <img
              src={featured.featuredImage}
              alt={featured.title}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageOverlay} aria-hidden="true" />
            {/* Status badge */}
            <div className={styles.statusBadge}>
              <span
                className={`${styles.statusDot} ${featured.status === 'In Progress' ? styles.dotActive : styles.dotDone}`}
                aria-hidden="true"
              />
              {featured.status}
            </div>
          </div>
        </motion.div>

        {/* 40% — Info panel */}
        <motion.div
          className={styles.infoCol}
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className={styles.infoContent}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Eyebrow */}
            <motion.p className={styles.eyebrow} variants={fadeUp}>
              Featured Project
            </motion.p>

            {/* Category badge */}
            <motion.span className={styles.categoryBadge} variants={fadeUp}>
              {featured.category}
            </motion.span>

            {/* Title */}
            <motion.h2
              id="featured-heading"
              className={styles.title}
              variants={fadeUp}
            >
              {featured.title}
            </motion.h2>

            {/* Accent line */}
            <motion.div
              className={styles.accentLine}
              variants={fadeUp}
              aria-hidden="true"
            />

            {/* Description */}
            <motion.p className={styles.description} variants={fadeUp}>
              {featured.shortDescription}
            </motion.p>

            {/* Key specs */}
            <motion.div className={styles.specs} variants={fadeUp}>
              {Object.entries(featured.specs).slice(0, 3).map(([key, val]) => (
                <div key={key} className={styles.specItem}>
                  <span className={styles.specKey}>{key}</span>
                  <span className={styles.specVal}>{val}</span>
                </div>
              ))}
            </motion.div>

            {/* Services tags */}
            <motion.div className={styles.tags} variants={fadeUp}>
              {featured.services.map((s) => (
                <span key={s} className={styles.tag}>{s}</span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Link
                to={`/projects/${featured.slug}`}
                className={styles.cta}
              >
                View Full Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}