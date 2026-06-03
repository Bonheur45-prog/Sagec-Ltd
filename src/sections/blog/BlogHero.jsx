// src/sections/blog/BlogHero/index.jsx
import { motion } from "framer-motion";
import blog from "@data/blog";
import styles from "./BlogHero.module.css";

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function BlogHero() {
  const totalPosts = blog.length;

  return (
    <section className={styles.section} aria-labelledby="blog-hero-heading">
      <div className={styles.container}>
        <motion.div variants={containerVariant} initial="hidden" animate="visible">

          <motion.span className={styles.eyebrow} variants={itemVariant}>
            News &amp; Insights
          </motion.span>

          <motion.h1
            className={styles.heading}
            id="blog-hero-heading"
            variants={itemVariant}
          >
            Ideas That <span>Shape</span> Rwanda
          </motion.h1>

          <motion.p className={styles.subline} variants={itemVariant}>
            Perspectives on architecture, engineering, and construction from
            the team building Rwanda's most ambitious projects.
          </motion.p>

          <motion.div variants={itemVariant}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              {totalPosts} article{totalPosts !== 1 ? "s" : ""} published
            </span>
          </motion.div>

          <motion.div
            className={styles.divider}
            variants={itemVariant}
            aria-hidden="true"
          />

        </motion.div>
      </div>
    </section>
  );
}