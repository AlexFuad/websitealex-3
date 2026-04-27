import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import SkillsSection from '../components/SkillsSection'
import PortfolioSection from '../components/PortfolioSection'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SEO from '../components/shared/SEO'
import HomeClient from './HomeClient'

export const metadata = {
  title: 'Home',
  description: 'Welcome to my portfolio. I\'m a passionate Full Stack Developer creating beautiful and functional web experiences with modern technologies.',
  keywords: 'home, portfolio, welcome, full stack developer, web development',
  openGraph: {
    title: 'Alex Fuad - Full Stack Developer',
    description: 'Passionate developer creating beautiful web experiences with React, Next.js, and modern web technologies.',
    type: 'website',
  },
  twitter: {
    title: 'Alex Fuad - Full Stack Developer',
    description: 'Passionate developer creating beautiful web experiences with React, Next.js, and modern web technologies.',
  },
}

export default async function Home() {
  return (
    <>
      <SEO />
      <Navbar />
      <HomeClient />
      <Footer />
    </>
  )
}
