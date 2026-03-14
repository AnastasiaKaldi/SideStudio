import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import ProjectCarousel from '../../components/ProjectCarousel/ProjectCarousel'
import './Landing.css'

const ease = [0.25, 0.1, 0.25, 1]

const flow = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
}

const flowDelayed = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease, delay: 0.3 } },
}

const flowUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
}

const serviceImages = [
  '/bento/socialmediamanagement.jpg',
  '/bento/contentcreation.jpg',
  '/bento/strategy.jpg',
  '/bento/creativedirection.jpg',
  '/bento/designthinking.jpg',
  '/bento/ads&reporting.jpg',
  '/bento/branddev.jpg',
  '/bento/consulting.jpg',
]

const serviceSizes = ['tall', 'wide', 'normal', 'large', 'normal', 'tall', 'tall', 'wide']

const greetings = [
  'hello', 'hola', 'bonjour', 'ciao', 'hallo',
  'olá', 'merhaba', 'ahoj', 'hej', 'namaste',
]

const greetingsGr = [
  'γεια', 'hola', 'bonjour', 'ciao', 'hallo',
  'olá', 'merhaba', 'ahoj', 'hej', 'namaste',
]

function Landing() {
  const location = useLocation()
  const { language, t } = useLanguage()
  const [flippedId, setFlippedId] = useState(null)

  const services = t('services')
  const currentGreetings = language === 'gr' ? greetingsGr : greetings

  // scroll to hash on mount (e.g. from /about clicking "services" in nav)
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location.hash])

  // contact greeting typewriter
  const [greeting, setGreeting] = useState('')
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formCompany, setFormCompany] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [formStatus, setFormStatus] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    const word = currentGreetings[greetingIndex]
    const timeout = isDeleting ? 50 : 100

    if (!isDeleting && greeting === word) {
      const t = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(t)
    }

    if (isDeleting && greeting === '') {
      setIsDeleting(false)
      setGreetingIndex((prev) => (prev + 1) % currentGreetings.length)
      return
    }

    const timer = setTimeout(() => {
      setGreeting(
        isDeleting
          ? word.substring(0, greeting.length - 1)
          : word.substring(0, greeting.length + 1)
      )
    }, timeout)

    return () => clearTimeout(timer)
  }, [greeting, isDeleting, greetingIndex, currentGreetings])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formMessage.trim()) return
    setIsSending(true)
    setFormStatus(null)

    try {
      const res = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          company: formCompany,
          message: formMessage,
        }),
      })

      if (res.ok) {
        setFormStatus('success')
        setFormName('')
        setFormEmail('')
        setFormCompany('')
        setFormMessage('')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="landing">
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Helmet>

      {/* HERO */}
      <section className="landing__section landing__section--hero">
        <motion.div
          className="landing__hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease }}
        >
          <img src="/hero.png" alt={t('heroAlt')} className="landing__hero-image" />
        </motion.div>
        <motion.div
          className="landing__logo"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.5 }}
        >
          <img src="/logo.png" alt="S/DE" className="landing__logo-image" />
        </motion.div>
      </section>

      {/* VIDEO */}
      <motion.section
        className="landing__section landing__section--video"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease }}
      >
        <video
          className="landing__video"
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </motion.section>

      {/* INTRO */}
      <section className="landing__section landing__section--intro">
        <motion.div
          className="landing__intro"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.h2 className="landing__intro-headline" variants={flowUp}>
            {t('introHeadline')}
          </motion.h2>
          <motion.p variants={flowDelayed}>
            {t('introP1')}
          </motion.p>
          <motion.p variants={flowDelayed}>
            {t('introP2')}
          </motion.p>

          <motion.div className="landing__intro-about" variants={flowDelayed}>
            <span className="section-label">{t('introAboutLabel')}</span>
            <Link to="/about" className="landing__intro-link">{t('introReadMore')}</Link>
          </motion.div>

          <motion.div className="landing__intro-cards" variants={flowDelayed}>
            <div className="landing__intro-card-wrapper">
              <Link to="/about" className="flip-card">
                <div className="flip-card__inner">
                  <div className="flip-card__front">
                    <img src="/aboutpagenikos.jpg" alt="nikos" className="flip-card__image" loading="lazy" />
                  </div>
                  <div className="flip-card__back">
                    <h3 className="flip-card__title">{t('flipNikosTitle')}</h3>
                    <p className="flip-card__text">{t('flipNikosText')}</p>
                    <span className="flip-card__arrow">&rarr;</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="landing__intro-card-wrapper">
              <Link to="/about" className="flip-card">
                <div className="flip-card__inner">
                  <div className="flip-card__front">
                    <img src="/aboutpagenikol.jpg" alt="nikol" className="flip-card__image" loading="lazy" />
                  </div>
                  <div className="flip-card__back">
                    <h3 className="flip-card__title">{t('flipNikolTitle')}</h3>
                    <p className="flip-card__text">{t('flipNikolText')}</p>
                    <span className="flip-card__arrow">&rarr;</span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHAT WE DO — commented out for now
      <section className="landing__section landing__section--projects">
        <motion.div
          className="landing__projects-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.span className="section-label" variants={flow}>{t('projectsLabel')}</motion.span>
          <motion.p className="landing__projects-subtitle" variants={flowDelayed}>
            {t('projectsSubtitle')}
          </motion.p>
        </motion.div>

        <ProjectCarousel />
      </section>
      */}

      {/* SERVICES BENTO GRID */}
      <section id="services" className="landing__section landing__section--services">
        <motion.div
          className="services-bento__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.span className="section-label" variants={flow}>{t('servicesLabel')}</motion.span>
          <motion.p className="services-bento__subtitle" variants={flowDelayed}>
            {t('servicesSubtitle')}
          </motion.p>
        </motion.div>

        <div className="services-bento">
          <div className="services-bento__grid">
            {services.map((service, i) => (
              <div
                key={service.id}
                className={`services-bento__card services-bento__card--${serviceSizes[i]} ${flippedId === service.id ? 'services-bento__card--flipped' : ''}`}
                onClick={() => setFlippedId(flippedId === service.id ? null : service.id)}
              >
                <div className="services-bento__card-inner">
                  <div className="services-bento__card-front">
                    <div className="services-bento__card-image" style={{ backgroundImage: `url(${serviceImages[i]})` }} />
                    <div className="services-bento__card-overlay">
                      <span className="services-bento__card-number">{String(service.id).padStart(2, '0')}</span>
                      <h3 className="services-bento__card-title">{service.title}</h3>
                    </div>
                  </div>
                  <div className="services-bento__card-back">
                    <span className="services-bento__card-number">{String(service.id).padStart(2, '0')}</span>
                    <h3 className="services-bento__card-back-title">{service.title}</h3>
                    <p className="services-bento__card-back-brief">{service.brief}</p>
                    <p className="services-bento__card-back-description">{service.description}</p>
                    <a
                      href="#contact"
                      className="services-bento__card-back-cta"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('servicesCta')} &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT — POSTCARD */}
      <section id="contact" className="landing__section landing__section--contact">
        <motion.div
          className="contact-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={flow}
        >
          <span className="section-label">{t('contactLabel')}</span>
        </motion.div>

        <motion.div
          className="postcard"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.3, ease, delay: 0.3 }}
        >
          {/* left side — message */}
          <div className="postcard__left">
            <h2 className="postcard__heading">
              {t('contactHeadingStart')}<span className="postcard__greeting">{greeting}<span className="postcard__cursor">|</span></span>{t('contactHeadingEnd')}
            </h2>
            <p className="postcard__message">
              {t('contactMessage')}
            </p>
            <div className="postcard__from">
              <p className="postcard__from-label">{t('contactFrom')}</p>
              <a href="mailto:sidecreativestudio@gmail.com" className="postcard__email">
                sidecreativestudio@gmail.com
              </a>
            </div>
          </div>

          {/* divider */}
          <div className="postcard__divider" />

          {/* right side — address / form */}
          <div className="postcard__right">
            <div className="postcard__stamp">
              <img src="/doublensRed.png" alt="by the double N's" className="postcard__stamp-img" loading="lazy" />
            </div>

            <form
              className="postcard__form"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="postcard__field">
                <input
                  type="text"
                  className="postcard__input"
                  placeholder={t('contactName')}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </div>
              <div className="postcard__field">
                <input
                  type="email"
                  className="postcard__input"
                  placeholder={t('contactEmail')}
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                />
              </div>
              <div className="postcard__field">
                <input
                  type="text"
                  className="postcard__input"
                  placeholder={t('contactCompany')}
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                />
              </div>
              <div className="postcard__field">
                <textarea
                  className="postcard__input postcard__input--textarea"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder={t('contactMessagePlaceholder')}
                  rows={4}
                />
              </div>

              {formStatus === 'success' && (
                <p className="postcard__status postcard__status--success">{t('contactSuccess')}</p>
              )}
              {formStatus === 'error' && (
                <p className="postcard__status postcard__status--error">{t('contactError')}</p>
              )}

              <button
                type="submit"
                className="postcard__submit"
                disabled={isSending || !formMessage.trim()}
              >
                {isSending ? t('contactSending') : t('contactSend')}
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Landing
