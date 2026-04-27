'use client'

import { motion } from 'framer-motion'
import { 
  Code, 
  Database, 
  Cloud, 
  Palette, 
  GitBranch, 
  Smartphone, 
  Globe, 
  Zap, 
  Shield, 
  Cpu, 
  Package,
  TestTube
} from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../lib/utils'

export default function SkillsSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const skills = [
    // Large items (2x2)
    {
      icon: Code,
      title: 'Frontend',
      description: 'React, Next.js, Vue.js, HTML5, CSS3',
      level: 95,
      color: 'from-blue-500 to-cyan-500',
      size: 'lg',
      gridPosition: 'row-span-2 col-span-2'
    },
    {
      icon: Globe,
      title: 'Backend',
      description: 'Node.js, Express, Python, Django',
      level: 90,
      color: 'from-green-500 to-emerald-500',
      size: 'lg',
      gridPosition: 'row-span-2 col-span-2'
    },
    
    // Medium items (1x2)
    {
      icon: Database,
      title: 'Databases',
      description: 'MongoDB, PostgreSQL, MySQL',
      level: 85,
      color: 'from-purple-500 to-pink-500',
      size: 'md',
      gridPosition: 'row-span-2'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'AWS, Docker, CI/CD, Vercel',
      level: 80,
      color: 'from-orange-500 to-red-500',
      size: 'md',
      gridPosition: 'row-span-2'
    },
    
    // Small items (1x1)
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Figma, Tailwind CSS, Material-UI',
      level: 88,
      color: 'from-pink-500 to-rose-500',
      size: 'sm',
      gridPosition: ''
    },
    {
      icon: GitBranch,
      title: 'Version Control',
      description: 'Git, GitHub, GitLab',
      level: 92,
      color: 'from-gray-500 to-slate-500',
      size: 'sm',
      gridPosition: ''
    },
    {
      icon: Smartphone,
      title: 'Mobile Dev',
      description: 'React Native, Flutter',
      level: 75,
      color: 'from-indigo-500 to-purple-500',
      size: 'sm',
      gridPosition: ''
    },
    {
      icon: Globe,
      title: 'Web APIs',
      description: 'REST, GraphQL, WebSocket',
      level: 87,
      color: 'from-teal-500 to-cyan-500',
      size: 'sm',
      gridPosition: ''
    },
    {
      icon: Code,
      title: 'Languages',
      description: 'JavaScript, TypeScript, Python',
      level: 95,
      color: 'from-yellow-500 to-orange-500',
      size: 'sm',
      gridPosition: ''
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimization, SEO, Analytics',
      level: 85,
      color: 'from-lime-500 to-green-500',
      size: 'sm',
      gridPosition: ''
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Authentication, JWT, OAuth',
      level: 78,
      color: 'from-red-500 to-pink-500',
      size: 'sm',
      gridPosition: ''
    },
    {
      icon: Cpu,
      title: 'Testing',
      description: 'Jest, Cypress, Unit Testing',
      level: 82,
      color: 'from-blue-500 to-indigo-500',
      size: 'sm',
      gridPosition: ''
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -10
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const getSizeClasses = (size) => {
    switch (size) {
      case 'lg':
        return 'p-6'
      case 'md':
        return 'p-5'
      case 'sm':
        return 'p-4'
      default:
        return 'p-4'
    }
  }

  const getIconSize = (size) => {
    switch (size) {
      case 'lg':
        return 'h-12 w-12'
      case 'md':
        return 'h-10 w-10'
      case 'sm':
        return 'h-8 w-8'
      default:
        return 'h-8 w-8'
    }
  }

  const getTitleSize = (size) => {
    switch (size) {
      case 'lg':
        return 'text-xl'
      case 'md':
        return 'text-lg'
      case 'sm':
        return 'text-base'
      default:
        return 'text-base'
    }
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            {t('skills.title')}
          </h2>
          <p className={cn("text-lg max-w-2xl mx-auto", isDark ? "text-gray-400" : "text-gray-600")}>
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(100px,auto)]"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                zIndex: 10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className={`
                ${skill.gridPosition}
                ${getSizeClasses(skill.size)}
                glass-card-dark
                rounded-xl
                border
                border-white/10
                hover:border-white/20
                transition-all
                duration-300
                cursor-pointer
                group
                relative
                overflow-hidden
              `}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 glass rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <skill.icon className={cn(getIconSize(skill.size), isDark ? "text-white" : "text-gray-900")} />
                </div>
                {skill.size === 'lg' && (
                  <span className={cn("text-2xl font-bold opacity-50", isDark ? "text-white" : "text-gray-900")}>
                    {skill.level}%
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className={cn(getTitleSize(skill.size), "font-bold group-hover:text-gradient transition-colors duration-300", isDark ? "text-white" : "text-gray-900")}>
                  {skill.title}
                </h3>
                
                {skill.size !== 'sm' && (
                  <p className={cn("text-sm leading-relaxed", isDark ? "text-gray-400" : "text-gray-600")}>
                    {skill.description}
                  </p>
                )}

                {/* Progress bar for larger items */}
                {(skill.size === 'lg' || skill.size === 'md') && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-600")}>{t('skills.proficiency')}</span>
                      <span className={cn("text-xs font-medium", isDark ? "text-white" : "text-gray-900")}>{skill.level}%</span>
                    </div>
                    <div className={cn("w-full h-2 rounded-full overflow-hidden", isDark ? "bg-white/10" : "bg-gray-200")}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                )}

                {/* Tags for small items */}
                {skill.size === 'sm' && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {skill.description.split(', ').slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className={cn("px-2 py-1 text-xs glass rounded-full", isDark ? "text-gray-300" : "text-gray-700")}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Floating animation for large items */}
              {skill.size === 'lg' && (
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '5+', label: t('skills.stats.experience') },
            { number: '50+', label: t('skills.stats.projects') },
            { number: '12', label: t('skills.categories.tools') },
            { number: '100%', label: t('skills.stats.satisfaction') },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card-dark p-6 text-center"
            >
              <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
              <div className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
