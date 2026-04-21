import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/shared/SEO'
import BlogClient from './BlogClient'

export const metadata = {
  title: 'Blog',
  description: 'Read my latest articles about web development, React, Next.js, and modern programming practices.',
  keywords: 'blog, articles, tutorials, web development, react, next.js, programming',
  openGraph: {
    title: 'Blog - Portfolio',
    description: 'Technical articles and tutorials about web development and programming.',
    type: 'blog',
  },
  twitter: {
    title: 'Blog - Portfolio',
    description: 'Technical articles and tutorials about web development and programming.',
  },
}

export default async function BlogPage() {
  return (
    <>
      <SEO />
      <Navbar />
      <BlogClient />
      <Footer />
    </>
  )
}
