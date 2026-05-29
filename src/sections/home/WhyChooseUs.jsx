// src/sections/home/WhyChooseUs/index.jsx
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@hooks/useInView";
import { reasons, sectionBackground, cardMedia } from "@data/whyChooseUs";
import styles from "./WhyChooseUs.module.css";

// ─── Animation variants ────────────────────────────────────────
const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const reasonVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const ctaVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: reasons.length * 0.12 + 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ─── Single reason row with circle-draw animation ──────────────
function ReasonItem({ reason, index, sectionInView }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const animated = sectionInView && inView;

  return (
    <motion.div
      ref={ref}
      className={`${styles.reason} ${animated ? styles.animated : ""}`}
      custom={index}
      variants={reasonVariants}
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
    >
      <div className={styles.iconWrap} aria-hidden="true">
        <svg
          className={styles.iconCircle}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className={styles.circlePath} cx="16" cy="16" r="14" />
          <polyline className={styles.checkPath} points="10,16 14,20 22,12" />
        </svg>
      </div>

      <div className={styles.reasonText}>
        <h3 className={styles.reasonTitle}>{reason.title}</h3>
        <p className={styles.reasonDesc}>{reason.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Right column media card ───────────────────────────────────
// FIX 3+4: Uses cardMedia (independent from sectionBackground).
// Renders inside a proper card with border-radius and overflow:hidden.
function MediaCard({ media }) {
  const hasSource = !!media.src;

  return (
    <div className={styles.mediaCol}>
      <div className={styles.mediaCard}>
        {!hasSource ? (
          <div className={styles.placeholder}>
            <svg
              className={styles.placeholderIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {media.type === "video" ? (
                <>
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </>
              ) : (
                <>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </>
              )}
            </svg>
            <p className={styles.placeholderLabel}>
              {media.type === "video"
                ? "Set cardMedia.src to your video path"
                : "Set cardMedia.src to your image path"}
            </p>
          </div>
        ) : media.type === "video" ? (
          <video
            className={styles.mediaVideo}
            src={media.src}
            poster={media.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            aria-label="SAGEC project showcase"
          />
        ) : (
          <img
            className={styles.mediaAsset}
            src={media.src}
            alt={media.alt}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────
export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const [inViewRef, inView] = useInView({ threshold: 0.08 });

  // Parallax: background moves dramatically via Framer Motion scroll tracking
  // Range: -25% to +25% (50% total) — MORE pronounced than Services (30%)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-25%', '25%']);

  // Combine refs for useInView and parallax scroll tracking
  const setRefs = (el) => {
    sectionRef.current = el;
    inViewRef.current = el;
  };

  return (
    <section
      ref={setRefs}
      className={styles.section}
      aria-labelledby="wcu-heading"
    >
      {/* Parallax background — moved by Framer Motion scroll transform */}
      <motion.div
        className={styles.parallaxBg}
        style={{
          y: backgroundY,
          backgroundImage: sectionBackground.src ? `url(${sectionBackground.src})` : undefined,
        }}
        aria-hidden="true"
      />

      {/* Gradient overlay — lighter left, much darker right */}
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── LEFT: content ── */}
        <div className={styles.content}>

          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <span className={styles.eyebrow}>Why choose us</span>
            <h2 className={styles.heading} id="wcu-heading">
              Built on <span>Trust</span>,<br />Delivered with Precision
            </h2>
            <p className={styles.subtext}>
              SAGEC brings together experience, local knowledge, and
              international standards — so every project stands as a
              testament to what Rwandan construction can achieve.
            </p>
          </motion.div>

          <div className={styles.reasons}>
            {reasons.map((reason, i) => (
              <ReasonItem
                key={reason.id}
                reason={reason}
                index={i}
                sectionInView={inView}
              />
            ))}
          </div>

          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Link to="/about" className={styles.cta}>
              Meet Our Team
              <span className={styles.ctaArrow} aria-hidden="true">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 5h6M5 2l3 3-3 3" />
                </svg>
              </span>
            </Link>
          </motion.div>

        </div>

        {/* ── RIGHT: media card — completely independent from the bg ── */}
        <MediaCard media={cardMedia} />

      </div>
    </section>
  );
}