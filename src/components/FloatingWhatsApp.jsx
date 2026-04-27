'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../lib/utils'

export default function FloatingWhatsApp() {
  const { isDark } = useTheme()
  const whatsappNumber = '6288291437432'
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300',
        isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'
      )}
      title="Chat via WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" />
      
      {/* Pulse animation */}
      <motion.span
        className="absolute inset-0 rounded-full bg-green-500"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.a>
  )
}
