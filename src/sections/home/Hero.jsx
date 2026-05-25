import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { heroSlides, heroStats } from '@data/heroSlides'
import { useTypewriter } from '@hooks/useTypewriter'
import styles from './Hero.module.css'

// ── ANIMATION VARIANTS ─────────────────────────────────────

const slideVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
  exit:    { opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } },
}

const contentVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

const itemVariants = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

// ── TYPEWRITER HEADLINE ────────────────────────────────────
// Isolated so it remounts (resetting the hook) on every slide change

function TypewriterHeadline({ text }) {
  const { displayed } = useTypewriter(text, 42)

  return (
    <h1 className={styles.headline}>
      {displayed}
      <span className={styles.cursor} aria-hidden="true">|</span>
    </h1>
  )
}

// ── MAIN HERO COMPONENT ────────────────────────────────────

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isAdvancingRef = useRef(false)
  const timerRef       = useRef(null)

  const currentSlide = heroSlides[currentIndex]

  // Advance to next slide — guarded against double-firing
  const advance = useCallback((toIndex = null) => {
    if (isAdvancingRef.current) return
    isAdvancingRef.current = true

    setCurrentIndex(prev => {
      const next = toIndex !== null
        ? toIndex
        : (prev + 1) % heroSlides.length
      return next
    })

    // Unlock after crossfade completes
    setTimeout(() => { isAdvancingRef.current = false }, 1400)
  }, [])

  // Auto-advance timer — only for image slides
  useEffect(() => {
    if (currentSlide.type === 'video') return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => advance(), currentSlide.duration ?? 7000)
    return () => clearTimeout(timerRef.current)
  }, [currentIndex, currentSlide, advance])

  // Cleanup on unmount
  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleVideoEnd = useCallback(() => advance(), [advance])

  const goToSlide = useCallback((index) => {
    if (index === currentIndex) return
    clearTimeout(timerRef.current)
    advance(index)
  }, [currentIndex, advance])

  return (
    <section className={styles.hero} aria-label="SAGEC hero slideshow">

      {/* ── SLIDE BACKGROUNDS ─────────────────────── */}
      <div className={styles.slidesContainer} aria-hidden="true">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className={styles.slide}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Background: video or image */}
            {currentSlide.type === 'video' ? (
              <video
                className={styles.videoBackground}
                src={currentSlide.src}
                poster={currentSlide.poster}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
              />
            ) : (
              <div
                className={styles.imageBackground}
                style={{ backgroundImage: `url(${currentSlide.src})` }}
              />
            )}

            {/* Dark navy overlay */}
            <div className={styles.overlay} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── HERO CONTENT ──────────────────────────── */}
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={styles.textContent}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Eyebrow */}
              <motion.p className={styles.eyebrow} variants={itemVariants}>
                Architectural &amp; Engineering Solutions
              </motion.p>

              {/* Headline — typewriter (remounts via parent AnimatePresence key) */}
              <motion.div variants={itemVariants}>
                <TypewriterHeadline text={currentSlide.headline} />
              </motion.div>

              {/* Subline */}
              <motion.p className={styles.subline} variants={itemVariants}>
                {currentSlide.subline}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div className={styles.buttons} variants={itemVariants}>
                <Link to="/projects" className={styles.btnPrimary}>
                  View Our Projects
                </Link>
                <Link to="/contact" className={styles.btnSecondary}>
                  Get in Touch
                </Link>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ──────────────────────── */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <motion.div
          className={styles.scrollMouse}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.span
            className={styles.scrollWheel}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* ── DOT INDICATORS ────────────────────────── */}
      <div className={styles.dots} role="tablist" aria-label="Slide navigation">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Slide ${i + 1}: ${slide.headline}`}
            className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>

      {/* ── STATS STRIP ───────────────────────────── */}
      <div className={styles.statsStrip}>
        <div className={styles.statsInner}>
          {heroStats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
              {/* Divider between items */}
              {i < heroStats.length - 1 && (
                <div className={styles.statDivider} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
