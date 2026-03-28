import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../../context/LanguageContext'
import AboutFooter from '../../components/AboutFooter/AboutFooter'
import './About.css'

function About() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(null)

  const studioRef = useRef(null)
  const approachRef = useRef(null)
  const peopleRef = useRef(null)
  const howWeWorkRef = useRef(null)

  useEffect(() => {
    document.body.classList.add('about-page')
    return () => document.body.classList.remove('about-page')
  }, [])

  const tabs = [
    { id: 'approach', label: t('aboutTabApproach'), ref: approachRef },
    { id: 'people', label: t('aboutTabPeople'), ref: peopleRef },
    { id: 'how-we-work', label: t('aboutTabHowWeWork'), ref: howWeWorkRef },
  ]

  const handleTabClick = (tab) => {
    setActiveTab(tab.id)
    if (tab.ref?.current) {
      const y = tab.ref.current.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="about">
      <Helmet>
        <title>{t('aboutPageTitle')}</title>
        <meta name="description" content={t('aboutPageDescription')} />
      </Helmet>

      {/* HERO */}
      <section className="about__hero">
        <h1 className="about__hero-title">{t('aboutHeroTitle')}</h1>
        <p className="about__hero-subtitle">{t('aboutHeroSubtitle')}</p>
      </section>

      {/* TABS */}
      <nav className="about__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`about__tab ${activeTab === tab.id ? 'about__tab--active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ABOUT SIDE STUDIO */}
      <section ref={studioRef} className="about__section">
        <h2 className="about__section-title">{t('aboutStudioTitle')}</h2>
        <div className="about__section-text">
          {t('aboutStudioTexts').map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          <p className="about__highlight">{t('aboutStudioHighlight')}</p>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section ref={approachRef} className="about__section">
        <h2 className="about__section-title">{t('aboutApproachTitle')}</h2>
        <div className="about__section-text">
          {t('aboutApproachTexts').map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          <span className="about__tags">{t('aboutApproachTags')}</span>
        </div>
      </section>

      {/* PEOPLE BEHIND */}
      <section ref={peopleRef} className="about__section">
        <h2 className="about__section-title">{t('aboutPeopleTitle')}</h2>
        <div className="about__section-text">
          {t('aboutPeopleTexts').map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </section>

      {/* NICOS */}
      <div className="about__person">
        <div className="about__person-text">
          <h3 className="about__person-name">{t('aboutNikosName')}</h3>
          <span className="about__person-role">{t('aboutNikosRole')}</span>
          <div className="about__person-bio">
            {t('aboutNikosBio').map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
        <div className="about__person-image">
          <img src="/aboutpagenikos.jpg" alt="nicos" loading="lazy" />
        </div>
      </div>

      {/* NICOLE */}
      <div className="about__person">
        <div className="about__person-text">
          <h3 className="about__person-name">{t('aboutNikolName')}</h3>
          <span className="about__person-role">{t('aboutNikolRole')}</span>
          <div className="about__person-bio">
            {t('aboutNikolBio').map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
        <div className="about__person-image">
          <img src="/aboutpagenikol.jpg" alt="nicole" loading="lazy" />
        </div>
      </div>

      {/* SIGNATURE */}
      <div className="about__signature">
        <img src="/doublensRed.png" alt="by the double N's" className="about__signature-img" loading="lazy" />
      </div>

      {/* QUOTE */}
      <section className="about__quote">
        <p>{t('aboutQuote')}</p>
      </section>

      {/* HOW WE WORK */}
      <section ref={howWeWorkRef} className="about__section">
        <h2 className="about__section-title">{t('aboutHowWeWorkTitle')}</h2>
        <div className="about__section-text">
          {t('aboutHowWeWorkTexts').map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about__cta">
        <p className="about__cta-text">
          {t('aboutCtaP1')}
          <br />
          {t('aboutCtaP2')}
        </p>
        <div>
          <Link to="/#contact" className="about__cta-button">
            {t('aboutCtaButton')}
          </Link>
        </div>
      </section>

      <AboutFooter />
    </div>
  )
}

export default About
