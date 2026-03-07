import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import './Footer.css'

const ease = [0.25, 0.1, 0.25, 1]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease },
  },
}

function Footer() {
  const { t } = useLanguage()

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="footer__inner">
        <motion.div className="footer__logo" variants={fadeUp}>
          <img src="/logowhite.png" alt="S/DE" className="footer__logo-img" loading="lazy" />
        </motion.div>

        <motion.div className="footer__nav" variants={fadeUp}>
          <div className="footer__nav-group">
            <Link to="/about" className="footer__nav-link">{t('navAbout')}</Link>
            <a href="/#services" className="footer__nav-link">{t('navServices')}</a>
            <a href="/#contact" className="footer__nav-link">{t('navContact')}</a>
          </div>

          <div className="footer__nav-group">
            <span className="footer__nav-title">{t('footerStalk')}</span>
            <a href="#" className="footer__nav-link">instagram</a>
            <a href="#" className="footer__nav-link">pinterest</a>
            <a href="#" className="footer__nav-link">linkedin</a>
          </div>
        </motion.div>

        <motion.div className="footer__legal" variants={fadeUp}>
          <a href="#" className="footer__legal-link">{t('footerPrivacy')}</a>
          <a href="#" className="footer__legal-link">{t('footerTerms')}</a>
        </motion.div>

        <motion.div className="footer__bottom" variants={fadeUp}>
          <span className="footer__copyright">{t('footerCopyright')}</span>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
