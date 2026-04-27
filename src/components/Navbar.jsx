'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun, Globe } from 'lucide-react'
import { cn } from '../lib/utils'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../contexts/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { t, language, toggleLanguage } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: t('navbar.home'), href: '#home' },
    { name: t('navbar.about'), href: '#about' },
    { name: t('navbar.portfolio'), href: '#portfolio' },
    { name: t('navbar.skills'), href: '#skills' },
    { name: t('navbar.contact'), href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'nav-blur shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <a href="#home" className="text-2xl font-bold text-gradient">
              Portfolio
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={toggleTheme}
              className={cn("p-2 rounded-lg glass-card-dark transition-colors duration-200", isDark ? "hover:bg-white/20" : "hover:bg-gray-100")}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
              onClick={toggleLanguage}
              className={cn("p-2 rounded-lg glass-card-dark transition-colors duration-200 flex items-center space-x-1", isDark ? "hover:bg-white/20" : "hover:bg-gray-100")}
              title={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
            >
              <Globe className={cn("h-5 w-5", isDark ? "text-white" : "text-gray-700")} />
              <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-700")}>{language === 'en' ? 'EN' : 'ID'}</span>
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn("p-2 rounded-md glass-card-dark transition-colors duration-200", isDark ? "hover:bg-white/20" : "hover:bg-gray-100")}
              >
                {isOpen ? (
                  <X className={cn('h-6 w-6', isDark ? 'text-white' : 'text-gray-900')} />
                ) : (
                  <Menu className={cn('h-6 w-6', isDark ? 'text-white' : 'text-gray-900')} />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: {
              opacity: 1,
              height: 'auto',
              transition: {
                duration: 0.3,
                ease: 'easeInOut',
              },
            },
            closed: {
              opacity: 0,
              height: 0,
              transition: {
                duration: 0.3,
                ease: 'easeInOut',
              },
            },
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                  isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
