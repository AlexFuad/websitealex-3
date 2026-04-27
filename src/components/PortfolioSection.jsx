'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Code, Calendar, Users, Star } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../lib/utils'

export default function PortfolioSection() {
  const { t, language } = useTranslation()
  const { isDark } = useTheme()
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A comprehensive e-commerce solution with real-time inventory management, payment processing, and responsive design. Features include user authentication, shopping cart, order tracking, and admin dashboard.',
      image: '/api/placeholder/600/400',
      tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      github: 'https://github.com/johndoe/ecommerce-platform',
      demo: 'https://ecommerce-demo.johndoe.dev',
      category: 'Full Stack',
      featured: true,
      stats: { stars: 245, forks: 89, users: 1200 }
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and advanced project tracking capabilities.',
      image: '/api/placeholder/600/400',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/johndoe/task-manager',
      demo: 'https://tasks-demo.johndoe.dev',
      category: 'Frontend',
      featured: true,
      stats: { stars: 189, forks: 67, users: 890 }
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with location-based forecasts, interactive maps, detailed meteorological data visualization, and weather alerts.',
      image: '/api/placeholder/600/400',
      tech: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Geolocation'],
      github: 'https://github.com/johndoe/weather-dashboard',
      demo: 'https://weather-demo.johndoe.dev',
      category: 'Frontend',
      featured: false,
      stats: { stars: 156, forks: 45, users: 670 }
    },
    {
      id: 4,
      title: 'Social Media Analytics',
      description: 'Analytics platform for social media management with data visualization, reporting, automated insights generation, and multi-platform integration.',
      image: '/api/placeholder/600/400',
      tech: ['Python', 'Django', 'PostgreSQL', 'D3.js'],
      github: 'https://github.com/johndoe/social-analytics',
      demo: 'https://analytics-demo.johndoe.dev',
      category: 'Backend',
      featured: false,
      stats: { stars: 203, forks: 78, users: 450 }
    },
    {
      id: 5,
      title: 'AI Chat Assistant',
      description: 'Intelligent chat assistant with natural language processing, context awareness, multi-language support, and integration with multiple AI services.',
      image: '/api/placeholder/600/400',
      tech: ['TypeScript', 'OpenAI API', 'React', 'WebSocket'],
      github: 'https://github.com/johndoe/ai-chatbot',
      demo: 'https://chat-demo.johndoe.dev',
      category: 'AI/ML',
      featured: true,
      stats: { stars: 412, forks: 134, users: 2100 }
    },
    {
      id: 6,
      title: 'Blog Platform',
      description: 'Modern blogging platform with markdown support, SEO optimization, comment system, and content management features.',
      image: '/api/placeholder/600/400',
      tech: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL'],
      github: 'https://github.com/johndoe/blog-platform',
      demo: 'https://blog-demo.johndoe.dev',
      category: 'Full Stack',
      featured: false,
      stats: { stars: 178, forks: 56, users: 340 }
    }
  ]

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI/ML']
  const categoryTranslations = {
    'All': t('portfolio.categories.all'),
    'Full Stack': t('portfolio.categories.fullStack'),
    'Frontend': t('portfolio.categories.frontend'),
    'Backend': t('portfolio.categories.backend'),
    'AI/ML': t('portfolio.categories.aiMl'),
  }
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

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
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      rotateY: -90,
      transformPerspective: 1000
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      transformPerspective: 1000,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Full Stack': 'from-blue-500 to-cyan-500',
      'Frontend': 'from-purple-500 to-pink-500',
      'Backend': 'from-green-500 to-emerald-500',
      'AI/ML': 'from-orange-500 to-red-500'
    }
    return colors[category] || 'from-gray-500 to-slate-500'
  }

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            {t('portfolio.title')}
          </h2>
          <p className={cn("text-lg max-w-2xl mx-auto", isDark ? "text-gray-400" : "text-gray-600")}>
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-6 py-2 rounded-full font-medium transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : cn('glass-card-dark', isDark ? 'hover:bg-white/20 text-gray-300' : 'hover:bg-gray-100 text-gray-700')}
                }
              `}
            >
              {categoryTranslations[category]}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {filteredProjects
            .filter(project => project.featured)
            .map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
                className="glass-card-dark rounded-xl overflow-hidden group"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Project Image */}
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(project.category)}/20 flex items-center justify-center`}>
                      <Code className={cn("h-16 w-16", isDark ? "text-white/50" : "text-gray-900/50")} />
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={cn("p-3 glass rounded-full transition-colors duration-200", isDark ? "hover:bg-white/20" : "hover:bg-gray-100")}
                      >
                        <Github className={cn("h-5 w-5", isDark ? "text-white" : "text-gray-900")} />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={cn("p-3 glass rounded-full transition-colors duration-200", isDark ? "hover:bg-white/20" : "hover:bg-gray-100")}
                      >
                        <ExternalLink className={cn("h-5 w-5", isDark ? "text-white" : "text-gray-900")} />
                      </motion.a>
                    </motion.div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 text-xs font-medium glass rounded-full bg-gradient-to-r ${getCategoryColor(project.category)} text-white`}>
                          {project.category}
                        </span>
                        <div className={cn("flex items-center space-x-1", isDark ? "text-yellow-400" : "text-yellow-600")}>
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm">{project.stats.stars}</span>
                        </div>
                      </div>
                      
                      <h3 className={cn("text-xl font-bold mb-3 group-hover:text-gradient transition-colors duration-300", isDark ? "text-white" : "text-gray-900")}>
                        {project.title}
                      </h3>
                      
                      <p className={cn("text-sm mb-4 line-clamp-3", isDark ? "text-gray-400" : "text-gray-600")}>
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className={cn("px-2 py-1 text-xs glass rounded-full", isDark ? "text-gray-300" : "text-gray-700")}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className={cn("px-2 py-1 text-xs glass rounded-full", isDark ? "text-gray-400" : "text-gray-600")}>
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className={cn("flex items-center space-x-4", isDark ? "text-gray-400" : "text-gray-600")}>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span className="text-xs">{project.stats.users}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-xs">2024</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <a
                          href={project.demo}
                          className={cn("text-sm font-medium transition-colors duration-300", isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700")}
                        >
                          {t('portfolio.liveDemo')}
                        </a>
                        <a
                          href={project.github}
                          className={cn("text-sm font-medium transition-colors duration-300", isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700")}
                        >
                          {t('portfolio.sourceCode')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
              }}
              className="glass-card-dark rounded-xl overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(project.category)}/20 flex items-center justify-center`}>
                  <Code className={cn("h-12 w-12", isDark ? "text-white/50" : "text-gray-900/50")} />
                </div>
                <motion.div
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 glass rounded-full hover:bg-white/20 transition-colors duration-200"
                  >
                    <Github className="h-5 w-5 text-white" />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 glass rounded-full hover:bg-white/20 transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5 text-white" />
                  </motion.a>
                </motion.div>
                {project.featured && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-medium rounded-full">
                    Featured
                  </div>
                )}
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium glass rounded-full bg-gradient-to-r ${getCategoryColor(project.category)} text-white`}>
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">{project.stats.stars}</span>
                  </div>
                </div>
                
                <h3 className={cn("text-lg font-bold mb-3 group-hover:text-gradient transition-colors duration-300", isDark ? "text-white" : "text-gray-900")}>
                  {project.title}
                </h3>
                
                <p className={cn("text-sm mb-4 line-clamp-2", isDark ? "text-gray-400" : "text-gray-600")}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={cn("px-2 py-1 text-xs glass rounded-full", isDark ? "text-gray-300" : "text-gray-700")}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className={cn("px-2 py-1 text-xs glass rounded-full", isDark ? "text-gray-400" : "text-gray-600")}>
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={cn("flex items-center space-x-3", isDark ? "text-gray-400" : "text-gray-600")}>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span className="text-xs">{project.stats.users}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span className="text-xs">{project.stats.stars}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <a
                      href={project.demo}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
                    >
                      {t('portfolio.liveDemo')}
                    </a>
                    <a
                      href={project.github}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
                    >
                      {t('portfolio.sourceCode')}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn("inline-flex items-center px-8 py-3 glass-card-dark rounded-full font-semibold transition-colors duration-300", isDark ? "hover:bg-white/20 text-white" : "hover:bg-gray-100 text-gray-900")}
          >
            {t('portfolio.viewProject')}
            <ExternalLink className="ml-2 h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
