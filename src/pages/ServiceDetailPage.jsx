import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { services } from '@data/services'
import styles from './ServiceDetailPage.module.css'

// ── CHECK ICON ─────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="#F26522" strokeWidth="1.4"/>
      <path d="M5 8l2 2 4-4" stroke="#F26522" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── ANIMATION VARIANTS ─────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

// ── MAIN PAGE ──────────────────────────────────────────────
export default function ServiceDetailPage() {
  const { slug } = useParams()

  // Find the service by slug
  const service = services.find((s) => s.slug === slug)

  // If slug doesn't match any service → redirect to /services
  if (!service) return <Navigate to="/services" replace />

  // Find adjacent services for navigation
  const currentIndex = services.findIndex((s) => s.slug === slug)
  const prevService  = services[currentIndex - 1] ?? null
  const nextService  = services[currentIndex + 1] ?? null

  return (
    <div className={styles.page}>

      {/* ── HERO ──────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <img
            src={service.detailImage || service.image}
            alt=""
            className={styles.heroBgImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <Link to="/services" className={styles.breadcrumbLink}>Services</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent}>{service.title}</span>
          </nav>

          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Our Services
          </motion.p>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {service.title}
          </motion.h1>

          <motion.div
            className={styles.heroAccent}
            style={{ transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ── CONTENT ───────────────────────── */}
      <section className={styles.content}>
        <div className={styles.contentInner}>

          {/* Main description */}
          <motion.div
            className={styles.descriptionBlock}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className={styles.descriptionHeading}>Overview</h2>
            <div className={styles.accentLine} aria-hidden="true" />
            <p className={styles.description}>{service.description}</p>
          </motion.div>

          {/* Deliverables */}
          <motion.div
            className={styles.deliverablesBlock}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className={styles.deliverablesHeading}>What's Included</h2>
            <div className={styles.accentLine} aria-hidden="true" />
            <motion.ul
              className={styles.deliverables}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {service.deliverables.map((item, i) => (
                <motion.li key={i} className={styles.deliverable} variants={fadeUp}>
                  <span className={styles.checkIcon}><CheckIcon /></span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div
          className={styles.ctaBlock}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className={styles.ctaText}>
            Interested in this service? Let's discuss your project.
          </p>
          <Link to="/contact" className={styles.ctaBtn}>
            Get a Quote
          </Link>
        </motion.div>
      </section>

      {/* ── SERVICE NAVIGATION ────────────── */}
      <nav className={styles.serviceNav} aria-label="Service navigation">
        <div className={styles.serviceNavInner}>
          {prevService ? (
            <Link to={prevService.link} className={styles.navLink}>
              <span className={styles.navDirection}>← Previous</span>
              <span className={styles.navServiceName}>{prevService.title}</span>
            </Link>
          ) : <div />}

          <Link to="/services" className={styles.navAll}>
            All Services
          </Link>

          {nextService ? (
            <Link to={nextService.link} className={`${styles.navLink} ${styles.navLinkRight}`}>
              <span className={styles.navDirection}>Next →</span>
              <span className={styles.navServiceName}>{nextService.title}</span>
            </Link>
          ) : <div />}
        </div>
      </nav>

    </div>
  )
}