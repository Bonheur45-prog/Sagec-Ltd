import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'SAGEC Ltd'
const SITE_URL = 'https://sagecltd.com'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

// Resolves a relative "/images/..." path to an absolute URL for OG/Twitter tags.
// Leaves already-absolute URLs (e.g. CDN-hosted blog images) untouched.
function resolveImage(image) {
  if (!image) return DEFAULT_IMAGE
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  return `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`
}

/**
 * Drop this at the top of any page component to set unique
 * title/description/canonical/OG tags for that route.
 *
 * path should be the route's path starting with '/', e.g. '/services/mep-engineering'
 */
export default function SEO({
  title,
  description,
  path = '',
  image,
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Building Excellence`
  const canonicalUrl = `${SITE_URL}${path}`
  const resolvedImage = resolveImage(image)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
    </Helmet>
  )
}