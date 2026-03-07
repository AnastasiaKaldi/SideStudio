import { createContext, useContext, useState, useCallback } from 'react'
import translations from '../translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const [showOverlay, setShowOverlay] = useState(false)

  const t = useCallback((key) => {
    return translations[language]?.[key] ?? translations.en[key] ?? key
  }, [language])

  const handleLanguageHover = () => {
    if (language === 'gr') {
      setShowOverlay(true)
    }
  }

  const switchToEnglish = () => {
    setLanguage('en')
    setShowOverlay(false)
  }

  const dismissOverlay = () => {
    setShowOverlay(false)
  }

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      showOverlay,
      handleLanguageHover,
      switchToEnglish,
      dismissOverlay
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
