import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { motion } from 'framer-motion'
import './Navbar.css'

const redPages = ['/about']

const ease = [0.25, 0.1, 0.25, 1]

function Navbar() {
  const { language, setLanguage, t, handleLanguageHover } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const isRedPage = redPages.includes(location.pathname)
  const isHome = location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    { label: t('navAbout'), to: '/about' },
    { label: t('navServices'), anchor: '#services' },
    { label: t('navContact'), anchor: '#contact' },
  ]

  const handleAnchorClick = (anchor) => {
    closeMenu()
    if (isHome) {
      const el = document.querySelector(anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + anchor)
    }
  }

  return (
    <motion.nav
      className={`navbar ${isRedPage ? 'navbar--red' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, ease, delay: 0.1 }}
    >
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
          {isHome ? (
            'side creative studio'
          ) : (
            <img src={isRedPage ? '/logowhite.png' : '/logo.png'} alt="S/DE" className="navbar__logo-img" />
          )}
        </NavLink>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>

        <div className={`navbar__right ${menuOpen ? 'navbar__right--open' : ''}`}>
          <div className="navbar__links">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.4 + i * 0.12 }}
              >
                {link.to ? (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <button
                    className="navbar__link navbar__link--anchor"
                    onClick={() => handleAnchorClick(link.anchor)}
                  >
                    {link.label}
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="navbar__language"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.8 }}
          >
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
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
