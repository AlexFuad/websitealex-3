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

export default function SkillsSection() {
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
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise. 
            Each skill represents years of experience and continuous learning.
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
                  <skill.icon className={`${getIconSize(skill.size)} text-white`} />
                </div>
                {skill.size === 'lg' && (
                  <span className="text-2xl font-bold text-white opacity-50">
                    {skill.level}%
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className={`${getTitleSize(skill.size)} font-bold text-white group-hover:text-gradient transition-colors duration-300`}>
                  {skill.title}
                </h3>
                
                {skill.size !== 'sm' && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {skill.description}
                  </p>
                )}

                {/* Progress bar for larger items */}
                {(skill.size === 'lg' || skill.size === 'md') && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Proficiency</span>
                      <span className="text-xs text-white font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
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
                        className="px-2 py-1 text-xs glass rounded-full text-gray-300"
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
            { number: '5+', label: 'Years Experience' },
            { number: '50+', label: 'Projects Completed' },
            { number: '12', label: 'Technologies' },
            { number: '100%', label: 'Client Satisfaction' },
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
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
