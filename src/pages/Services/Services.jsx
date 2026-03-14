import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import './Services.css'

const ease = [0.25, 0.1, 0.25, 1]

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

function Services() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(null)
  const tabs = t('servicesPageTabs')
  const sections = t('servicesPageSections')
  const sectionRefs = useRef({})

  const handleTabClick = (index) => {
    if (index === 0) {
      // "all" tab — scroll to top of content
      setActiveTab(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const section = sections[index - 1]
    if (section && sectionRefs.current[section.id]) {
      setActiveTab(index)
      sectionRefs.current[section.id].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="services-page">
      <Helmet>
        <title>{t('servicesPageTitle')}</title>
        <meta name="description" content={t('servicesPageDescription')} />
      </Helmet>

      {/* HERO */}
      <motion.div
        className="services-page__hero"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.h1 className="services-page__title" variants={fadeIn}>
          {t('servicesPageHeroTitle')}
        </motion.h1>
        <motion.p className="services-page__subtitle" variants={fadeIn}>
          {t('servicesPageHeroSubtitle')}
        </motion.p>
        <motion.p className="services-page__desc" variants={fadeIn}>
          {t('servicesPageHeroDesc')}
        </motion.p>
        <motion.p className="services-page__cta-text" variants={fadeIn}>
          {t('servicesPageHeroCta')}
        </motion.p>
      </motion.div>

      {/* TABS */}
      <motion.div
        className="services-page__tabs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.5 }}
      >
        <div className="services-page__tabs-inner">
          {tabs.slice(1).map((tab, i) => (
            <button
              key={tab}
              className={`services-page__tab ${activeTab === i + 1 ? 'services-page__tab--active' : ''}`}
              onClick={() => handleTabClick(i + 1)}
            >
              {tab}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ALL SERVICES INTRO */}
      <motion.div
        className="services-page__section services-page__section--all"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <motion.h2 className="services-page__section-title" variants={fadeIn}>
          {t('servicesPageAllTitle')}
        </motion.h2>
        <motion.p className="services-page__tagline" variants={fadeIn}>
          {t('servicesPageAllTagline')}
        </motion.p>
        <motion.p className="services-page__bold-text" variants={fadeIn}>
          {t('servicesPageAllBold')}
        </motion.p>
        <motion.p className="services-page__body-text" variants={fadeIn}>
          {t('servicesPageAllText')}
        </motion.p>
      </motion.div>

      {/* INDIVIDUAL SERVICE SECTIONS */}
      {sections.map((section) => (
        <motion.div
          key={section.id}
          ref={(el) => (sectionRefs.current[section.id] = el)}
          className="services-page__section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.h2 className="services-page__section-title" variants={fadeIn}>
            {section.title}
          </motion.h2>
          <motion.p className="services-page__bold-text" variants={fadeIn}>
            {section.bold}
          </motion.p>
          <motion.p className="services-page__body-text" variants={fadeIn}>
            {section.text}
          </motion.p>
        </motion.div>
      ))}

      {/* CTA */}
      <motion.div
        className="services-page__footer-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.p className="services-page__closing" variants={fadeIn}>
          good work usually starts with a conversation.
        </motion.p>
        <motion.div variants={fadeIn}>
          <Link to="/#contact" className="services-page__cta-btn">— get in touch</Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Services
