import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './TestimonialsHero.module.css';

// Animation variants (same staggered pattern as AboutHero)
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TestimonialsHero() {
  // Check if custom hero image exists? We'll just use conditional background in CSS
  // For now, we provide an image path that may or may not exist.
  // If the image fails to load, the fallback dark navy + particles will show.

  return (
    <section className={styles.hero} aria-label="Testimonials Hero">
      {/* Background layer: image (optional) + overlay + particles */}
      <div className={styles.backgroundLayer}>
        <img
          src="/images/testimonials/testimonials-hero.jpg"
          alt=""
          className={styles.bgImage}
          onError={(e) => {
            // If image fails to load, hide it so only dark navy + particles show
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className={styles.overlay} />
        <div className={styles.particles} aria-hidden="true" />
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
            <Link to="/" className={styles.breadcrumbHome}>Home</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent}>Testimonials</span>
          </motion.nav>

          {/* Eyebrow */}
          <motion.p className={styles.eyebrow} variants={itemVariants}>
            Client Stories
          </motion.p>

          {/* Headline */}
          <motion.h1 className={styles.headline} variants={itemVariants}>
            What Our Clients Say
          </motion.h1>

          {/* Orange accent line */}
          <motion.div
            className={styles.accentLine}
            variants={{
              hidden: { scaleX: 0, originX: 0 },
              visible: {
                scaleX: 1,
                originX: 0,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
              },
            }}
            aria-hidden="true"
          />

          {/* Subline */}
          <motion.p className={styles.subline} variants={itemVariants}>
            Real feedback from partners, developers, and institutions who trust SAGEC to bring their vision to life.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}