'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../lib/utils'

export default function Contact() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.contactInfo.email'),
      value: 'alex.fuad@example.com',
      href: 'mailto:alex.fuad@example.com',
    },
    {
      icon: Phone,
      label: t('contact.contactInfo.phone'),
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      label: t('contact.contactInfo.location'),
      value: 'San Francisco, CA',
      href: '#',
    },
  ]

  const socialLinks = [
    { icon: Github, href: '#', label: t('contact.social.github') },
    { icon: Linkedin, href: '#', label: t('contact.social.linkedin') },
    { icon: Twitter, href: '#', label: t('contact.social.twitter') },
  ]

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            {t('contact.title')}
          </h2>
          <p className={cn("text-lg max-w-2xl mx-auto", isDark ? "text-gray-400" : "text-gray-600")}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.form
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={cn("w-full px-4 py-3 glass-card-dark border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20", isDark ? "border-white/20 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500")}
                  placeholder={t('contact.placeholders.name')}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={cn("w-full px-4 py-3 glass-card-dark border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20", isDark ? "border-white/20 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500")}
                  placeholder={t('contact.placeholders.email')}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                  {t('contact.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={cn("w-full px-4 py-3 glass-card-dark border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20", isDark ? "border-white/20 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500")}
                  placeholder={t('contact.placeholders.subject')}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={cn("w-full px-4 py-3 glass-card-dark border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none", isDark ? "border-white/20 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500")}
                  placeholder={t('contact.placeholders.message')}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>{t('contact.sending')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>{t('contact.sendMessage')}</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  whileHover={{ x: 10 }}
                  className={cn("flex items-center space-x-4 p-4 glass-card-dark rounded-lg transition-colors duration-300", isDark ? "hover:bg-white/10" : "hover:bg-gray-100")}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="flex-shrink-0 w-12 h-12 rounded-full glass flex items-center justify-center"
                  >
                    <info.icon className={cn("h-6 w-6", isDark ? "text-white" : "text-gray-900")} />
                  </motion.div>
                  <div>
                    <div className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>{info.label}</div>
                    <div className={cn("font-medium", isDark ? "text-white" : "text-gray-900")}>{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card-dark p-6"
            >
              <h3 className={cn("text-lg font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>{t('contact.connectWithMe')}</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn("p-3 glass rounded-full transition-colors duration-200", isDark ? "hover:bg-white/20" : "hover:bg-gray-100")}
                  >
                    <social.icon className={cn("h-5 w-5", isDark ? "text-white" : "text-gray-900")} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card-dark p-6 border-l-4 border-green-500"
            >
              <h3 className={cn("text-lg font-semibold mb-2", isDark ? "text-white" : "text-gray-900")}>{t('contact.currentStatus')}</h3>
              <p className={cn(isDark ? "text-gray-400" : "text-gray-600")}>
                {t('contact.statusMessage')}
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">{t('contact.availableForWork')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
