'use client'

import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import SkillsSection from '../components/SkillsSection'
import PortfolioSection from '../components/PortfolioSection'
import About from '../components/About'
import Contact from '../components/Contact'

export default function HomeClient() {
  const [skills, setSkills] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    
    try {
      // Fetch skills data
      const skillsResponse = await fetch('/api/skills')
      if (skillsResponse.ok) {
        const skillsData = await skillsResponse.json()
        setSkills(skillsData.skills || [])
      }

      // Fetch portfolio data
      const portfolioResponse = await fetch('/api/portfolio')
      if (portfolioResponse.ok) {
        const portfolioData = await portfolioResponse.json()
        setPortfolio(portfolioData.projects || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-r-2 border-t-2 border-l-2 border-blue-500"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      
      {/* Pass fetched data to components */}
      <SkillsSection skills={skills} />
      <PortfolioSection projects={portfolio} />
      
      <About />
      <Contact />
    </main>
  )
}
