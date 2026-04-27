import { useLanguage } from '../contexts/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

export const useTranslation = () => {
  const { language, toggleLanguage } = useLanguage()
  const translations = language === 'id' ? id : en

  const t = (key) => {
    const keys = key.split('.')
    let value = translations
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return { t, language, toggleLanguage }
}
