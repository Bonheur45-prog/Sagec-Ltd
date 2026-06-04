import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import { useCountUp } from '@hooks/useCountUp'
import styles from './ProjectsStats.module.css'

const stats = [
  { value: 10,   suffix: '+', label: 'Years Experience' },
  { value: 30,   suffix: '+', label: 'Projects Completed' },
  { value: 50,   suffix: '+', label: 'Happy Clients' },
  { value: null, text: 'Kigali', suffix: '', label: 'Rwanda' },
]

function StatItem({ stat, start }) {
  const count = useCountUp(stat.value ?? 0, 2000, start)
  const display = stat.value === null ? stat.text : count

  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>
        {display}
        {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  )
}

export default function ProjectsStats() {
  const [ref, inView] = useInView(0.3)

  return (
    <motion.div
      ref={ref}
      className={styles.strip}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {stats.map((stat, i) => (
        <div key={i} className={styles.statWrapper}>
          <StatItem stat={stat} start={inView} />
          {i < stats.length - 1 && (
            <div className={styles.divider} aria-hidden="true" />
          )}
        </div>
      ))}
    </motion.div>
  )
}