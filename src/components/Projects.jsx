'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Code } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and responsive design.',
      tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#',
      image: '/api/placeholder/600/400',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
      github: '#',
      demo: '#',
      image: '/api/placeholder/600/400',
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with location-based forecasts, interactive maps, and detailed meteorological data visualization.',
      tech: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Geolocation'],
      github: '#',
      demo: '#',
      image: '/api/placeholder/600/400',
    },
    {
      title: 'Social Media Analytics',
      description: 'Analytics platform for social media management with data visualization, reporting, and automated insights generation.',
      tech: ['Python', 'Django', 'PostgreSQL', 'D3.js'],
      github: '#',
      demo: '#',
      image: '/api/placeholder/600/400',
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio website with glassmorphism design, smooth animations, and optimized performance.',
      tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      github: '#',
      demo: '#',
      image: '/api/placeholder/600/400',
    },
    {
      title: 'AI Chat Assistant',
      description: 'Intelligent chat assistant with natural language processing, context awareness, and multi-language support.',
      tech: ['TypeScript', 'OpenAI API', 'React', 'WebSocket'],
      github: '#',
      demo: '#',
      image: '/api/placeholder/600/400',
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
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore my recent work and side projects. Each project represents my passion for creating 
            innovative solutions and attention to detail.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-card-dark h-full overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="h-16 w-16 text-white/50" />
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
                      className="p-3 glass-card rounded-full hover:bg-white/20 transition-colors duration-200"
                    >
                      <Github className="h-5 w-5 text-white" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 glass-card rounded-full hover:bg-white/20 transition-colors duration-200"
                    >
                      <ExternalLink className="h-5 w-5 text-white" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium glass rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
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
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 glass-card-dark rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
          >
            View All Projects
            <ExternalLink className="ml-2 h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
