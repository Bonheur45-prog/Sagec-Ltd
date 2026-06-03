// src/sections/blog/BlogPosts/index.jsx
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import blog, { BLOG_CATEGORIES } from "@data/blog";
import styles from "./BlogPosts.module.css";

const PAGE_SIZE = 6;

// ─── Arrow SVG reused in multiple places ──────────────────────
function ArrowSVG() {
  return (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 5h6M5 2l3 3-3 3" />
    </svg>
  );
}

// ─── Image or placeholder ──────────────────────────────────────
function CoverImage({ src, alt, className, placeholderClass }) {
  if (src) {
    return (
      <img className={className} src={src} alt={alt}
        loading="lazy" decoding="async" />
    );
  }
  return (
    <div className={placeholderClass} role="img" aria-label={alt}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

// ─── Featured post card ────────────────────────────────────────
function FeaturedPost({ post }) {
  return (
    <div className={styles.featuredWrap}>
      <span className={styles.featuredLabel}>Featured Article</span>
      <Link to={`/blog/${post.slug}`} className={styles.featuredCard}>
        <CoverImage
          src={post.coverImage}
          alt={post.title}
          className={styles.featuredImage}
          placeholderClass={styles.featuredImagePlaceholder}
        />
        <div className={styles.featuredContent}>
          <div className={styles.featuredMeta}>
            <span className={styles.catBadge}>{post.category}</span>
            <span className={styles.metaDot} aria-hidden="true" />
            <span className={styles.metaText}>{post.readTime}</span>
            <span className={styles.metaDot} aria-hidden="true" />
            <span className={styles.metaText}>{post.date}</span>
          </div>
          <h2 className={styles.featuredTitle}>{post.title}</h2>
          <p className={styles.featuredExcerpt}>{post.excerpt}</p>
          <span className={styles.readLink}>
            Read Article
            <span className={styles.readArrow}>
              <ArrowSVG />
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}

// ─── Regular blog card ─────────────────────────────────────────
function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className={styles.card}>
      <CoverImage
        src={post.coverImage}
        alt={post.title}
        className={styles.cardImage}
        placeholderClass={styles.cardImagePlaceholder}
      />
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.cardCatBadge}>{post.category}</span>
          <span className={styles.cardMetaDot} aria-hidden="true" />
          <span className={styles.cardMetaText}>{post.readTime}</span>
          <span className={styles.cardMetaDot} aria-hidden="true" />
          <span className={styles.cardMetaText}>{post.date}</span>
        </div>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <div className={styles.cardSpacer} />
        <span className={styles.cardReadMore}>
          Read More <ArrowSVG />
        </span>
      </div>
    </Link>
  );
}

// ─── Pagination ────────────────────────────────────────────────
function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;

  // Build page numbers with ellipsis
  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className={styles.pagination} aria-label="Blog pagination">
      {/* Prev arrow */}
      <button
        className={`${styles.pageBtn} ${current === 1 ? styles.pageBtnDisabled : ""}`}
        onClick={() => onChange(current - 1)}
        aria-label="Previous page"
        disabled={current === 1}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 3L5 8l5 5" />
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className={styles.pageDots}>…</span>
        ) : (
          <button
            key={p}
            className={`${styles.pageBtn} ${p === current ? styles.pageBtnActive : ""}`}
            onClick={() => onChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === current ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      {/* Next arrow */}
      <button
        className={`${styles.pageBtn} ${current === total ? styles.pageBtnDisabled : ""}`}
        onClick={() => onChange(current + 1)}
        aria-label="Next page"
        disabled={current === total}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3l5 5-5 5" />
        </svg>
      </button>
    </nav>
  );
}

// ─── Main section ──────────────────────────────────────────────
export default function BlogPosts() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage]       = useState(1);
  const gridRef = useRef(null);

  // Featured post — always the one marked featured (not filtered)
  const featuredPost = blog.find((p) => p.featured) ?? blog[0];

  // Grid posts — exclude featured, apply category filter
  const gridSource = blog.filter((p) => p.id !== featuredPost.id);

  const filteredPosts = activeCategory === "All"
    ? gridSource
    : gridSource.filter((p) => p.category === activeCategory);

  const totalPages  = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const pagePosts   = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of grid
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={styles.section} aria-labelledby="posts-heading">
      <div className={styles.container}>

        {/* Featured post */}
        <FeaturedPost post={featuredPost} />

        {/* Grid header: title + category filters */}
        <div className={styles.gridHeader} ref={gridRef}>
          <h2 className={styles.gridTitle} id="posts-heading">
            All Articles
            {activeCategory !== "All" && ` — ${activeCategory}`}
          </h2>
          <div className={styles.filters} role="group" aria-label="Filter by category">
            {["All", ...BLOG_CATEGORIES].map((cat) => (
              <button
                key={cat}
                className={`${styles.pill} ${activeCategory === cat ? styles.pillActive : ""}`}
                onClick={() => handleCategoryChange(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <div className={styles.grid}>
          {pagePosts.length > 0 ? (
            pagePosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyText}>
                No articles in this category yet.
              </p>
              <button
                className={styles.emptyReset}
                onClick={() => handleCategoryChange("All")}
              >
                View all articles
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />

      </div>
    </section>
  );
}