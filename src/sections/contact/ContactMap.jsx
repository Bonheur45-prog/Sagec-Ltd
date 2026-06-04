import { motion } from 'framer-motion'
import styles from './ContactMap.module.css'

export default function ContactMap() {
  return (
    <section className={styles.section} aria-label="SAGEC office location">

      {/* Label strip above map */}
      <motion.div
        className={styles.strip}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.stripInner}>
          <div className={styles.stripPin} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#F26522"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          </div>
          <span className={styles.stripText}>
            SAGEC Ltd — Kigali, Rwanda
          </span>
        </div>
      </motion.div>

      {/* Map embed */}
      <div className={styles.mapWrapper}>
        <iframe
          className={styles.map}
          title="SAGEC Ltd office location in Kigali, Rwanda"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.1908685827!2d29.92358695!3d-1.9440727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xf32b36a5411d0bc8!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2srw!4v1699000000000!5m2!1sen!2srw"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Overlay card on map */}
        <div className={styles.mapCard}>
          <p className={styles.mapCardTitle}>SAGEC Ltd</p>
          <p className={styles.mapCardSub}>Architectural & Engineering Solutions</p>
          <div className={styles.mapCardDivider} aria-hidden="true" />
          <a
            href="https://maps.google.com/?q=Kigali,Rwanda"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapCardLink}
          >
            Get Directions →
          </a>
        </div>
      </div>

    </section>
  )
}