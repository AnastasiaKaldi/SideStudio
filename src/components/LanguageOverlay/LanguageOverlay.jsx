import { useLanguage } from '../../context/LanguageContext'
import './LanguageOverlay.css'

function LanguageOverlay() {
  const { showOverlay, switchToEnglish } = useLanguage()

  if (!showOverlay) return null

  return (
    <div className="language-overlay" onClick={switchToEnglish}>
      <div className="language-overlay__content">
        <p className="language-overlay__message">for the international crowd</p>
      </div>
    </div>
  )
}

export default LanguageOverlay
