'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'id' : 'en'
    changeLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
