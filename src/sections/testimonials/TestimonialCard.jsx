import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './TestimonialCard.module.css';
import TestimonialModal from './TestimonialModal';

// Helper: extract initials from name
function getInitials(name) {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export default function TestimonialCard({ testimonial, featured = false }) {
  const { quote, name, title, company, photo } = testimonial;
  const [modalOpen, setModalOpen] = useState(false);
  const initials = getInitials(name);
  const roleString = [title, company].filter(Boolean).join(' · ');

  // Truncate quote for small cards (first 120 chars + ellipsis)
  const displayQuote = featured
    ? quote
    : quote.length > 140
    ? quote.slice(0, 140) + '...'
    : quote;

  const cardClass = featured ? styles.cardLarge : styles.cardSmall;

  return (
    <>
      <motion.article
        className={`${styles.card} ${cardClass}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Decorative quotation mark */}
        <span className={styles.quoteDecor} aria-hidden="true">
          &ldquo;
        </span>

        {/* Quote text */}
        <p className={styles.quoteText} title={quote}>
          {displayQuote}
        </p>

        {/* Read more button (always visible) */}
        <button
          className={styles.readMoreBtn}
          onClick={() => setModalOpen(true)}
          aria-label={`Read full testimonial from ${name}`}
        >
          Read more
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>

        <div className={styles.divider} />

        {/* Client info */}
        <div className={styles.client}>
          <div className={styles.avatar}>
            {photo ? (
              <img className={styles.avatarImg} src={photo} alt={name} loading="lazy" />
            ) : (
              <div className={styles.avatarInitials} aria-hidden="true">
                {initials}
              </div>
            )}
          </div>
          <div className={styles.clientInfo}>
            <p className={styles.clientName}>{name}</p>
            {roleString && <p className={styles.clientRole}>{roleString}</p>}
          </div>
        </div>
      </motion.article>

      {/* Modal */}
      <TestimonialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        testimonial={testimonial}
      />
    </>
  );
}