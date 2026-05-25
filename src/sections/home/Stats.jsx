import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import { useCountUp } from '@hooks/useCountUp'
import styles from './Stats.module.css'

// ── STAT DATA ──────────────────────────────────────────────
const stats = [
  {
    id: 1,
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    description: 'Over a decade of delivering architectural and engineering excellence across Rwanda.',
    icon: <YearsIcon />,
  },
  {
    id: 2,
    value: 30,
    suffix: '+',
    label: 'Projects Completed',
    description: 'From landmark commercial buildings to premium interior design commissions.',
    icon: <ProjectsIcon />,
  },
  {
    id: 3,
    value: 50,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Trusted by government institutions, private developers, and businesses alike.',
    icon: <ClientsIcon />,
  },
  {
    id: 4,
    value: null,      // text stat — no count-up
    text: 'Kigali',
    suffix: '',
    label: 'Rwanda',
    description: 'Headquartered in Kigali, delivering landmark projects across the nation.',
    icon: <LocationIcon />,
  },
]

// ── ANIMATION VARIANTS ─────────────────────────────────────
const sectionVariants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeUpVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── INDIVIDUAL STAT CARD ───────────────────────────────────
function StatCard({ stat, start }) {
  const count = useCountUp(stat.value ?? 0, 2000, start)
  const displayValue = stat.value === null ? stat.text : count

  return (
    <div className={styles.card}>
      {/* Orange icon */}
      <div className={styles.iconWrapper} aria-hidden="true">
        {stat.icon}
      </div>

      {/* Orange accent line */}
      <div className={styles.accentLine} />

      {/* Number / text */}
      <p className={styles.statValue}>
        {displayValue}
        {stat.suffix && (
          <span className={styles.suffix}>{stat.suffix}</span>
        )}
      </p>

      {/* Label */}
      <p className={styles.statLabel}>{stat.label}</p>

      {/* Description */}
      <p className={styles.statDescription}>{stat.description}</p>
    </div>
  )
}

// ── MAIN STATS SECTION ─────────────────────────────────────
export default function Stats() {
  const [sectionRef, inView] = useInView(0.25)

  return (
    <section className={styles.section} aria-labelledby="stats-heading">
      <div className={styles.container}>

        {/* Eyebrow */}
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariants}
        >
          <span className={styles.eyebrow}>Our Impact</span>
          <h2 id="stats-heading" className={styles.heading}>
            Numbers That Define Us
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          ref={sectionRef}
          className={styles.grid}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {stats.map((stat, i) => (
            <motion.div key={stat.id} className={styles.cardWrapper} variants={cardVariants}>
              <StatCard stat={stat} start={inView} />
              {i < stats.length - 1 && (
                <div className={styles.divider} aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Supporting text */}
        <motion.p
          className={styles.supportingText}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariants}
        >
          Every project is a testament to our commitment — built on trust,
          precision, and a relentless pursuit of excellence.
        </motion.p>

      </div>
    </section>
  )
}

// ── SVG ICONS ──────────────────────────────────────────────

function YearsIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="15" stroke="#F26522" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 12v8l5 3" stroke="#F26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="20" r="1.5" fill="#F26522"/>
    </svg>
  )
}

function ProjectsIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="6" y="18" width="10" height="16" rx="1" stroke="#F26522" strokeWidth="2"/>
      <rect x="15" y="10" width="10" height="24" rx="1" stroke="#F26522" strokeWidth="2"/>
      <rect x="24" y="14" width="10" height="20" rx="1" stroke="#F26522" strokeWidth="2"/>
      <line x1="4" y1="34" x2="36" y2="34" stroke="#F26522" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function ClientsIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="15" cy="14" r="5" stroke="#F26522" strokeWidth="2"/>
      <path d="M6 32c0-5 4-8 9-8s9 3 9 8" stroke="#F26522" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="28" cy="14" r="4" stroke="#F26522" strokeWidth="2"/>
      <path d="M28 24c3.5 0 6 2.5 6 6" stroke="#F26522" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 6C14.477 6 10 10.477 10 16c0 8 10 18 10 18s10-10 10-18c0-5.523-4.477-10-10-10z"
        stroke="#F26522"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="16" r="3.5" stroke="#F26522" strokeWidth="2"/>
    </svg>
  )
}