import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/shared/SEO'
import PortfolioClient from './PortfolioClient'

export const metadata = {
  title: 'Portfolio',
  description: 'Complete portfolio showcase of projects, skills, and professional experience.',
  keywords: 'portfolio, showcase, full stack developer, web development, projects gallery',
  openGraph: {
    title: 'Portfolio - Portfolio',
    description: 'Complete portfolio showcase of web development projects and professional experience.',
    type: 'website',
  },
  twitter: {
    title: 'Portfolio - Portfolio',
    description: 'Complete portfolio showcase of web development projects and professional experience.',
  },
}

export default async function PortfolioPage() {
  return (
    <>
      <SEO />
      <Navbar />
      <PortfolioClient />
      <Footer />
    </>
  )
}
