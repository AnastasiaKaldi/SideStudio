import { NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import './Navbar.css'

const redPages = ['/about']

function Navbar() {
  const { language, setLanguage, handleLanguageHover } = useLanguage()
  const location = useLocation()
  const isRedPage = redPages.includes(location.pathname)
  const isHome = location.pathname === '/'

  return (
    <nav className={`navbar ${isRedPage ? 'navbar--red' : ''}`}>
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo">
          {isHome ? (
            'side creative studio'
          ) : (
            <img src={isRedPage ? '/logowhite.png' : '/logo.png'} alt="S/DE" className="navbar__logo-img" />
          )}
        </NavLink>

        <div className="navbar__right">
          <div className="navbar__links">
            <NavLink to="/about" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
              about
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
              services
            </NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
              portfolio
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
              contact
            </NavLink>
          </div>

          <div className="navbar__language">
            <button
              className={`navbar__lang-btn ${language === 'gr' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => setLanguage('gr')}
            >
              gr
            </button>
            <span className="navbar__lang-separator">|</span>
            <button
              className={`navbar__lang-btn ${language === 'en' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => setLanguage('en')}
              onMouseEnter={handleLanguageHover}
            >
              en
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar