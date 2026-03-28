import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../../context/LanguageContext'
import './Services.css'

function Services() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(null)
  const tabs = t('servicesPageTabs')
  const sections = t('servicesPageSections')
  const sectionRefs = useRef({})

  const handleTabClick = (index) => {
    if (index === 0) {
      setActiveTab(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const section = sections[index - 1]
    if (section && sectionRefs.current[section.id]) {
      setActiveTab(index)
      const y = sectionRefs.current[section.id].getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="services-page">
      <Helmet>
        <title>{t('servicesPageTitle')}</title>
        <meta name="description" content={t('servicesPageDescription')} />
      </Helmet>

      {/* HERO */}
      <div className="services-page__hero">
        <h1 className="services-page__title">{t('servicesPageHeroTitle')}</h1>
        <p className="services-page__subtitle">{t('servicesPageHeroSubtitle')}</p>
        <p className="services-page__desc">{t('servicesPageHeroDesc')}</p>
        <p className="services-page__cta-text">{t('servicesPageHeroCta')}</p>
      </div>

      {/* TABS */}
      <div className="services-page__tabs">
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
      </div>

      {/* ALL SERVICES INTRO */}
      <div className="services-page__section services-page__section--all">
        <h2 className="services-page__section-title">{t('servicesPageAllTitle')}</h2>
        <p className="services-page__tagline">{t('servicesPageAllTagline')}</p>
        <p className="services-page__bold-text">{t('servicesPageAllBold')}</p>
        <p className="services-page__body-text">{t('servicesPageAllText')}</p>
      </div>

      {/* INDIVIDUAL SERVICE SECTIONS */}
      {sections.map((section) => (
        <div
          key={section.id}
          ref={(el) => (sectionRefs.current[section.id] = el)}
          className="services-page__section"
        >
          <h2 className="services-page__section-title">{section.title}</h2>
          <p className="services-page__bold-text">{section.bold}</p>
          <p className="services-page__body-text">{section.text}</p>
        </div>
      ))}

      {/* CTA */}
      <div className="services-page__footer-cta">
        <p className="services-page__closing">good work usually starts with a conversation.</p>
        <div>
          <Link to="/#contact" className="services-page__cta-btn">— get in touch</Link>
        </div>
      </div>
    </div>
  )
}

export default Services
