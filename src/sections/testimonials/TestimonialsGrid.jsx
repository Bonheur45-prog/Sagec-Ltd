import testimonials from '@data/testimonials';
import TestimonialCard from './TestimonialCard';
import styles from './TestimonialsGrid.module.css';

export default function TestimonialsGrid() {
  // Separate featured (first two) and non-featured
  const featured = testimonials.filter(t => t.featured === true);
  const nonFeatured = testimonials.filter(t => t.featured !== true);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Real Experiences</span>
          <h2 className={styles.heading}>
            Trusted by Rwanda’s <span>Leading Institutions</span>
          </h2>
          <p className={styles.subheading}>
            We measure success through the satisfaction of our clients. Here's what they have to say.
          </p>
        </div>

        {/* Featured row: 2 large cards */}
        <div className={styles.featuredRow}>
          {featured.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} featured={true} />
          ))}
        </div>

        {/* Small cards grid: 2 columns on desktop, 1 on mobile */}
        <div className={styles.smallGrid}>
          {nonFeatured.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} featured={false} />
          ))}
        </div>
      </div>
    </section>
  );
}