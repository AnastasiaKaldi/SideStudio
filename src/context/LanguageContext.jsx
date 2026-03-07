import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('gr')
  const [showOverlay, setShowOverlay] = useState(false)

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
