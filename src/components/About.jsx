'use client'

import { motion } from 'framer-motion'
import { Award, Briefcase, GraduationCap, Target } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../lib/utils'

export default function About() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const stats = [
    { icon: Briefcase, label: t('about.projects'), value: '50+' },
    { icon: Award, label: t('about.awards'), value: '15' },
    { icon: GraduationCap, label: t('about.certifications'), value: '8' },
    { icon: Target, label: t('about.clients'), value: '100+' },
  ]

  const skills = [
    { category: t('skills.categories.frontend'), items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
    { category: t('skills.categories.backend'), items: ['Node.js', 'Python', 'Django', 'PostgreSQL', 'MongoDB'] },
    { category: t('skills.categories.tools'), items: ['Git', 'Docker', 'AWS', 'Figma', 'Vercel'] },
  ]

  const timeline = [
    {
      year: '2024 - Present',
      title: t('about.jobTitles.senior'),
      company: t('about.timeline.company1'),
      description: t('about.timeline.desc1'),
    },
    {
      year: '2022 - 2024',
      title: t('about.jobTitles.mid'),
      company: t('about.timeline.company2'),
      description: t('about.timeline.desc2'),
    },
    {
      year: '2020 - 2022',
      title: t('about.jobTitles.frontend'),
      company: t('about.timeline.company3'),
      description: t('about.timeline.desc3'),
    },
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
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            {t('about.title')}
          </h2>
          <p className={cn("text-lg max-w-2xl mx-auto", isDark ? "text-gray-400" : "text-gray-600")}>
            {t('about.description')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="glass-card-dark p-6 text-center"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full glass mb-4"
              >
                <stat.icon className={cn("h-6 w-6", isDark ? "text-white" : "text-gray-900")} />
              </motion.div>
              <div className={cn("text-2xl font-bold mb-1", isDark ? "text-white" : "text-gray-900")}>{stat.value}</div>
              <div className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h3 className={cn("text-2xl font-bold mb-8 text-center", isDark ? "text-white" : "text-gray-900")}>{t('skills.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <motion.div
                key={skillGroup.category}
                whileHover={{ y: -5 }}
                className="glass-card-dark p-6"
              >
                <h4 className={cn("text-lg font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>{skillGroup.category}</h4>
                <div className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className={cn(isDark ? "text-gray-300" : "text-gray-700")}>{skill}</span>
                      <div className={cn("w-24 h-2 rounded-full overflow-hidden", isDark ? "bg-white/10" : "bg-gray-200")}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '80%' }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className={cn("text-2xl font-bold mb-8 text-center", isDark ? "text-white" : "text-gray-900")}>{t('about.experience')}</h3>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="glass-card-dark p-6 border-l-4 border-blue-500"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-gray-900")}>{item.title}</h4>
                  <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>{item.year}</span>
                </div>
                <div className={cn("mb-2", isDark ? "text-blue-400" : "text-blue-600")}>{item.company}</div>
                <p className={cn(isDark ? "text-gray-400" : "text-gray-600")}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
