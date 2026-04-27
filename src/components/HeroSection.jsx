'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles, Instagram } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../lib/utils'

export default function HeroSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: { y: 50, opacity: 0, rotate: 180 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const animatedTitle = t('hero.subtitle')
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="flex items-center justify-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className={cn("h-5 w-5", isDark ? "text-yellow-400" : "text-yellow-600")} />
            </motion.div>
            <p className={cn("text-lg md:text-xl font-medium", isDark ? "text-gray-400" : "text-gray-600")}>
              {t('hero.greeting')}
            </p>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient"
          >
            {t('hero.title').split('').map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Animated Title */}
          <motion.div variants={itemVariants} className="relative">
            <div className={cn("text-2xl md:text-3xl lg:text-4xl font-semibold", isDark ? "text-white" : "text-gray-900")}>
              {animatedTitle.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.5 }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className={cn("text-lg md:text-xl max-w-2xl mx-auto leading-relaxed", isDark ? "text-gray-400" : "text-gray-600")}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>{t('hero.getInTouch')}</span>
            </motion.a>
            
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn("px-8 py-3 glass-card-dark rounded-full font-semibold transition-all duration-300 flex items-center space-x-2", isDark ? "text-white hover:bg-white/20" : "text-gray-900 hover:bg-gray-100")}
            >
              <Download className="h-4 w-4" />
              <span>{t('hero.viewProjects')}</span>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn("px-8 py-3 glass-card-dark rounded-full font-semibold transition-all duration-300 flex items-center space-x-2", isDark ? "text-white hover:bg-white/20" : "text-gray-900 hover:bg-gray-100")}
            >
              <Download className="h-4 w-4" />
              <span>{t('hero.resume')}</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, href: 'https://github.com/AlexFuad/', label: t('hero.social.github') },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/alexander-hilarius-fuad-fatahillah-9b1aa031/', label: t('hero.social.linkedin') },
              { icon: Instagram, href: 'https://instagram.com/alexanderhff', label: 'Instagram' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                  boxShadow: '0 5px 15px rgba(255, 255, 255, 0.3)'
                }}
                whileTap={{ scale: 0.9 }}
                className={cn("p-3 glass-card-dark rounded-full transition-all duration-300", isDark ? "hover:bg-white/20" : "hover:bg-gray-100")}
                aria-label={social.label}
              >
                <social.icon className={cn("h-5 w-5", isDark ? "text-white" : "text-gray-900")} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <a href="#skills" className={cn("transition-colors duration-300", isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900")}>
            <ArrowDown className="h-6 w-6" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
