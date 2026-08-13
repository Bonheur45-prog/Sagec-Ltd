import SEO from '@components/SEO';
import { seo } from '@data/seo';
import BlogHero from '@sections/blog/BlogHero';
import BlogPosts from '@sections/blog/BlogPosts';

export default function BlogPage() {
  return (
    <>
      <SEO {...seo.blog} />
      <BlogHero />
      <BlogPosts />
    </>
  );
}
