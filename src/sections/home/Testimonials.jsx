// src/sections/home/Testimonials/index.jsx
import { useState, useCallback, useEffect, useRef } from "react";
import testimonials from "@data/testimonials";
import styles from "./Testimonials.module.css";

const PAGE_SIZE = 3;
const TOTAL_PAGES = Math.ceil(testimonials.length / PAGE_SIZE);

// ─── Extract initials from a full name ────────────────────────
function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// ─── Single testimonial card ───────────────────────────────────
function TestimonialCard({ testimonial }) {
  const { quote, name, title, company, photo } = testimonial;
  const initials = getInitials(name);
  const roleString = [title, company].filter(Boolean).join(" · ");

  return (
    <article className={styles.card}>
      {/* Decorative large quotation mark */}
      <span className={styles.quoteDecor} aria-hidden="true">
        &ldquo;
      </span>

      {/* Quote — full text in title attr for accessibility + hover tooltip */}
      <p className={styles.quoteText} title={quote}>
        {quote}
      </p>

      <div className={styles.divider} />

      {/* Client info */}
      <div className={styles.client}>
        <div className={styles.avatar}>
          {photo ? (
            <img
              className={styles.avatarImg}
              src={photo}
              alt={name}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={styles.avatarInitials} aria-hidden="true">
              {initials}
            </div>
          )}
        </div>

        <div className={styles.clientInfo}>
          <p className={styles.clientName}>{name}</p>
          {roleString && (
            <p className={styles.clientRole}>{roleString}</p>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Main section ──────────────────────────────────────────────
export default function Testimonials() {
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);

  // Ref to hold the fade timer so we can clear it on unmount
  const fadeTimerRef = useRef(null);

  // Cleanup timer on unmount to avoid setState on unmounted component
  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  // Paginate with a brief fade out → update → fade in
  const goToPage = useCallback(
    (next) => {
      if (next < 0 || next >= TOTAL_PAGES || next === page) return;
      setFading(true);
      fadeTimerRef.current = setTimeout(() => {
        setPage(next);
        setFading(false);
      }, 250);
    },
    [page]
  );

  const currentSlice = testimonials.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  const isPrevDisabled = page === 0;
  const isNextDisabled = page === TOTAL_PAGES - 1;

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.container}>

        {/* ── Header: heading left + arrows right ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Client Stories</span>
            <h2 className={styles.heading} id="testimonials-heading">
              What Our <span>Clients</span> Say
            </h2>
          </div>

          <div className={styles.arrows} role="group" aria-label="Testimonial navigation">
            <button
              className={`${styles.arrowBtn} ${isPrevDisabled ? styles.arrowDisabled : ""}`}
              onClick={() => goToPage(page - 1)}
              aria-label="Previous testimonials"
              disabled={isPrevDisabled}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M10 3L5 8l5 5" />
              </svg>
            </button>

            <button
              className={`${styles.arrowBtn} ${isNextDisabled ? styles.arrowDisabled : ""}`}
              onClick={() => goToPage(page + 1)}
              aria-label="Next testimonials"
              disabled={isNextDisabled}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className={styles.gridWrapper}>
          <div
            className={`${styles.grid} ${fading ? styles.fading : ""}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {currentSlice.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>

        {/* ── Pagination dots ── */}
        {TOTAL_PAGES > 1 && (
          <div className={styles.pagination} role="tablist" aria-label="Testimonial pages">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === page}
                aria-label={`Page ${i + 1}`}
                className={`${styles.pageDot} ${i === page ? styles.activeDot : ""}`}
                onClick={() => goToPage(i)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}