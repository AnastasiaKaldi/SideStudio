import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import AboutFooter from '../../components/AboutFooter/AboutFooter'
import './About.css'

const ease = [0.25, 0.1, 0.25, 1]

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

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
      tab.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        <motion.h1
          className="about__hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease }}
        >
          {t('aboutHeroTitle')}
        </motion.h1>
        <motion.p
          className="about__hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        >
          {t('aboutHeroSubtitle')}
        </motion.p>
      </section>

      {/* TABS */}
      <motion.nav
        className="about__tabs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.4 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`about__tab ${activeTab === tab.id ? 'about__tab--active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </motion.nav>

      {/* ABOUT SIDE STUDIO */}
      <motion.section
        ref={studioRef}
        className="about__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2 className="about__section-title" variants={fadeIn}>
          {t('aboutStudioTitle')}
        </motion.h2>
        <div className="about__section-text">
          {t('aboutStudioTexts').map((text, i) => (
            <motion.p key={i} variants={fadeIn}>{text}</motion.p>
          ))}
          <motion.p className="about__highlight" variants={fadeIn}>
            {t('aboutStudioHighlight')}
          </motion.p>
        </div>
      </motion.section>

      {/* OUR APPROACH */}
      <motion.section
        ref={approachRef}
        className="about__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2 className="about__section-title" variants={fadeIn}>
          {t('aboutApproachTitle')}
        </motion.h2>
        <div className="about__section-text">
          {t('aboutApproachTexts').map((text, i) => (
            <motion.p key={i} variants={fadeIn}>{text}</motion.p>
          ))}
          <motion.span className="about__tags" variants={fadeIn}>
            {t('aboutApproachTags')}
          </motion.span>
        </div>
      </motion.section>

      {/* PEOPLE BEHIND */}
      <motion.section
        ref={peopleRef}
        className="about__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <motion.h2 className="about__section-title" variants={fadeIn}>
          {t('aboutPeopleTitle')}
        </motion.h2>
        <div className="about__section-text">
          {t('aboutPeopleTexts').map((text, i) => (
            <motion.p key={i} variants={fadeIn}>{text}</motion.p>
          ))}
        </div>
      </motion.section>

      {/* NICOS */}
      <div className="about__person">
        <motion.div
          className="about__person-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.h3 className="about__person-name" variants={fadeIn}>
            {t('aboutNikosName')}
          </motion.h3>
          <motion.span className="about__person-role" variants={fadeIn}>
            {t('aboutNikosRole')}
          </motion.span>
          <div className="about__person-bio">
            {t('aboutNikosBio').map((text, i) => (
              <motion.p key={i} variants={fadeIn}>{text}</motion.p>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="about__person-image"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, ease }}
        >
          <img src="/aboutpagenikos.jpg" alt="nicos" loading="lazy" />
        </motion.div>
      </div>

      {/* NICOLE */}
      <div className="about__person">
        <motion.div
          className="about__person-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.h3 className="about__person-name" variants={fadeIn}>
            {t('aboutNikolName')}
          </motion.h3>
          <motion.span className="about__person-role" variants={fadeIn}>
            {t('aboutNikolRole')}
          </motion.span>
          <div className="about__person-bio">
            {t('aboutNikolBio').map((text, i) => (
              <motion.p key={i} variants={fadeIn}>{text}</motion.p>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="about__person-image"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, ease }}
        >
          <img src="/aboutpagenikol.jpg" alt="nicole" loading="lazy" />
        </motion.div>
      </div>

      {/* SIGNATURE */}
      <motion.div
        className="about__signature"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease }}
      >
        <img src="/doublensRed.png" alt="by the double N's" className="about__signature-img" loading="lazy" />
      </motion.div>

      {/* QUOTE */}
      <motion.section
        className="about__quote"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease }}
      >
        <p>{t('aboutQuote')}</p>
      </motion.section>

      {/* HOW WE WORK */}
      <motion.section
        ref={howWeWorkRef}
        className="about__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2 className="about__section-title" variants={fadeIn}>
          {t('aboutHowWeWorkTitle')}
        </motion.h2>
        <div className="about__section-text">
          {t('aboutHowWeWorkTexts').map((text, i) => (
            <motion.p key={i} variants={fadeIn}>{text}</motion.p>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="about__cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.p className="about__cta-text" variants={fadeIn}>
          {t('aboutCtaP1')}
          <br />
          {t('aboutCtaP2')}
        </motion.p>
        <motion.div variants={fadeIn}>
          <Link to="/#contact" className="about__cta-button">
            {t('aboutCtaButton')}
          </Link>
        </motion.div>
      </motion.section>

      <AboutFooter />
    </div>
  )
}

export default About
