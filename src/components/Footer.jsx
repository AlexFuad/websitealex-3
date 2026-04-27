'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart, Instagram } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../lib/utils'

export default function Footer() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const socialLinks = [
    { icon: Github, href: 'https://github.com/AlexFuad/', label: t('footer.social.github') },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/alexander-hilarius-fuad-fatahillah-9b1aa031/', label: t('footer.social.linkedin') },
    { icon: Instagram, href: 'https://instagram.com/alexanderhff', label: 'Instagram' },
    { icon: Mail, href: 'mailto:info@alexfuad.my.id', label: t('footer.social.email') },
  ]

  const footerSections = [
    {
      title: t('footer.quickLinks'),
      links: [t('navbar.home'), t('navbar.about'), t('navbar.portfolio'), t('navbar.skills'), t('navbar.contact')],
    },
    {
      title: t('footer.resources'),
      links: [t('footer.blog'), t('footer.resume'), t('footer.testimonials')],
    },
    {
      title: t('footer.socialLinks'),
      links: ['GitHub', 'LinkedIn', 'Twitter', 'Email'],
    },
  ]

  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gradient">{t('footer.brand')}</h3>
            <p className={cn("text-sm leading-relaxed", isDark ? "text-gray-400" : "text-gray-600")}>
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={cn("p-2 rounded-lg glass-card-dark transition-colors duration-200", isDark ? "hover:bg-white/20" : "hover:bg-gray-100")}
                  aria-label={social.label}
                >
                  <social.icon className={cn("h-4 w-4", isDark ? "text-gray-300" : "text-gray-700")} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="space-y-4"
            >
              <h4 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-gray-900")}>{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: linkIndex * 0.05 + 0.1 }}
                  >
                    <a
                      href={`#${link.toLowerCase()}`}
                      className={cn("text-sm transition-colors duration-200", isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900")}
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className={cn("flex items-center space-x-2 text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
            <span>© 2024 {t('footer.brand')}. {t('footer.rights')}</span>
          </div>
          
          <motion.div
            className={cn("flex items-center space-x-2 text-sm", isDark ? "text-gray-400" : "text-gray-600")}
            whileHover={{ scale: 1.05 }}
          >
            <span>{t('footer.madeWith')}</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>{t('footer.using')}</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
