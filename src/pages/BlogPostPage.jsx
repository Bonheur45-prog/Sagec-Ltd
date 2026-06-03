// src/pages/BlogPostPage.jsx
import { useParams, Navigate, Link } from "react-router-dom";
import blog from "@data/blog";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blog.find((p) => p.slug === slug);

  // Redirect to /blog if slug not found
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px" }}>
      {/* Back link */}
      <Link
        to="/blog"
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
          color: "var(--color-orange)", textDecoration: "none",
          marginBottom: 32
        }}
      >
        ← Back to News &amp; Insights
      </Link>

      {/* Category + read time + date */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700,
          letterSpacing: "1px", textTransform: "uppercase",
          color: "var(--color-orange)",
          background: "rgba(242,101,34,0.08)", border: "1px solid rgba(242,101,34,0.2)",
          borderRadius: 4, padding: "3px 9px"
        }}>{post.category}</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(27,42,74,0.45)" }}>
          {post.readTime}
        </span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(27,42,74,0.45)" }}>
          {post.date}
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: 700, color: "var(--color-navy)", lineHeight: 1.15,
        marginBottom: 32
      }}>
        {post.title}
      </h1>

      {/* Cover image */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          style={{
            width: "100%", borderRadius: 10, marginBottom: 40,
            objectFit: "cover", maxHeight: 460, display: "block"
          }}
          loading="eager"
        />
      )}

      {/* Content — rendered as HTML from data */}
      <div
        style={{
          fontFamily: "var(--font-body)", fontSize: 16,
          color: "rgba(27,42,74,0.75)", lineHeight: 1.85
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}