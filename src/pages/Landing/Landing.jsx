import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ProjectCarousel from '../../components/ProjectCarousel/ProjectCarousel'
import './Landing.css'

const bentoServices = [
  {
    id: 1,
    title: 'social media management',
    brief: 'end-to-end management of your digital presence.',
    description: 'we handle content strategy, content creation, planning and posting schedules, captions, community management, and performance tracking — ensuring consistent communication and measurable growth across platforms.',
    size: 'tall',
    image: '/bento/socialmediamanagement.jpg',
  },
  {
    id: 2,
    title: 'content creation',
    brief: 'original visual content from concept to post-production.',
    description: 'from concept development and moodboard preparation to photography, videography, and full post-production, we create visual assets ready for immediate use across social media, websites, and paid campaigns.',
    size: 'wide',
    image: '/bento/contentcreation.jpg',
  },
  {
    id: 3,
    title: 'strategy & planning',
    brief: 'monthly planning aligned with brand goals.',
    description: 'includes content calendars, campaign planning, positioning strategy, and clearly defined kpis to guide consistent growth and communication.',
    size: 'normal',
    image: '/bento/strategy.jpg',
  },
  {
    id: 4,
    title: 'creative direction',
    brief: 'shaping the core idea behind a brand\'s visual output.',
    description: 'from defining the visual language to translating strategy into creative executions, we ensure that content, campaigns, and design assets remain aligned and coherent across all channels.',
    size: 'large',
    image: '/bento/creativedirection.jpg',
  },
  {
    id: 5,
    title: 'design thinking',
    brief: 'branded assets that support consistent communication.',
    description: 'creation of essential branded assets including social media visuals, story templates, promotional graphics, and layout elements that support consistent brand communication.',
    size: 'normal',
    image: '/bento/designthinking.jpg',
  },
  {
    id: 6,
    title: 'ads & reporting',
    brief: 'paid media campaigns, optimized and tracked.',
    description: 'we handle audience targeting, budget allocation, creative alignment, and tracking configuration. monthly reporting includes performance analysis, key insights, and actionable recommendations to improve results.',
    size: 'tall',
    image: '/bento/ads&reporting.jpg',
  },
  {
    id: 7,
    title: 'brand development',
    brief: 'building brands from the ground up.',
    description: 'from naming and visual identity to tone of voice and brand guidelines — we lay the foundation for brands that feel intentional, consistent, and ready to grow.',
    size: 'tall',
    image: '/bento/branddev.jpg',
  },
  {
    id: 8,
    title: 'consulting',
    brief: 'advisory sessions for brand growth.',
    description: 'clear feedback, structured guidance, and practical next steps tailored to your brand\'s needs — covering brand positioning, content strategy, digital presence, and performance optimization.',
    size: 'wide',
    image: '/bento/consulting.jpg',
  },
]

const greetings = [
  'hello', 'hola', 'bonjour', 'ciao', 'hallo',
  'olá', 'merhaba', 'ahoj', 'hej', 'namaste',
]

function Landing() {
  const location = useLocation()
  const [flippedId, setFlippedId] = useState(null)

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
  const [formMessage, setFormMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const word = greetings[greetingIndex]
    const timeout = isDeleting ? 50 : 100

    if (!isDeleting && greeting === word) {
      const t = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(t)
    }

    if (isDeleting && greeting === '') {
      setIsDeleting(false)
      setGreetingIndex((prev) => (prev + 1) % greetings.length)
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
  }, [greeting, isDeleting, greetingIndex])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formMessage.trim()) return
    setIsSending(true)
    const mailtoLink = `mailto:sidecreativestudio@gmail.com?subject=new inquiry&body=${encodeURIComponent(formMessage)}`
    window.location.href = mailtoLink
    setTimeout(() => setIsSending(false), 1000)
  }

  return (
    <div className="landing">
      <Helmet>
        <title>side studio | creative direction, content & strategy</title>
        <meta name="description" content="Born as a side project, built with intention. Side Studio shapes contemporary brands through strategic creative direction, character-led content, and purposeful design." />
      </Helmet>

      {/* HERO */}
      <section className="landing__section landing__section--hero">
        <div className="landing__hero">
          <img src="/hero.png" alt="side creative studio" className="landing__hero-image" />
        </div>
        <div className="landing__logo">
          <img src="/logo.png" alt="S/DE" className="landing__logo-image" />
        </div>
      </section>

      {/* VIDEO */}
      <section className="landing__section landing__section--video">
        <video
          className="landing__video"
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </section>

      {/* INTRO */}
      <section className="landing__section landing__section--intro">
        <div className="landing__intro">
          <h2 className="landing__intro-headline">
            Side Creative Studio is a dynamic platform showcasing a diverse and captivating creative portfolio.
          </h2>
          <p>
            Based in a vibrant city, we are passionate about transforming concepts into compelling visual narratives through our expertise in art direction, photography, and styling.
          </p>
          <p>
            Our visual storytelling is a testament to our commitment to delivering pure visual language that resonates with the audience.
          </p>

          <div className="landing__intro-about">
            <span className="section-label">about</span>
            <Link to="/about" className="landing__intro-link">read more</Link>
          </div>

          <div className="landing__intro-cards">
            <div className="landing__intro-card-wrapper">
              <Link to="/about" className="flip-card">
                <div className="flip-card__inner">
                  <div className="flip-card__front">
                    <img src="/aboutpagenikos.jpg" alt="nikos" className="flip-card__image" loading="lazy" />
                  </div>
                  <div className="flip-card__back">
                    <h3 className="flip-card__title">nikolaos</h3>
                    <p className="flip-card__text">ideas, concepts, and creative storytelling driven by instinct and surrealism.</p>
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
                    <h3 className="flip-card__title">nikoleta</h3>
                    <p className="flip-card__text">structure, strategy, and aesthetic precision grounded in logic and observation.</p>
                    <span className="flip-card__arrow">&rarr;</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="landing__section landing__section--projects">
        <div className="landing__projects-header">
          <span className="section-label">what we do</span>
          <p className="landing__projects-subtitle">
            a selection of projects we've brought to life.
          </p>
        </div>

        <ProjectCarousel />
      </section>

      {/* SERVICES BENTO GRID */}
      <section id="services" className="landing__section landing__section--services">
        <div className="services-bento__header">
          <span className="section-label">our services</span>
          <p className="services-bento__subtitle">
            what we do and how we help brands grow.
          </p>
        </div>

        <div className="services-bento">
          <div className="services-bento__grid">
            {bentoServices.map((service) => (
              <div
                key={service.id}
                className={`services-bento__card services-bento__card--${service.size} ${flippedId === service.id ? 'services-bento__card--flipped' : ''}`}
                onClick={() => setFlippedId(flippedId === service.id ? null : service.id)}
              >
                <div className="services-bento__card-inner">
                  <div className="services-bento__card-front">
                    <div className="services-bento__card-image" style={{ backgroundImage: `url(${service.image})` }} />
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
                      get in touch &rarr;
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
        <div className="contact-header">
          <span className="section-label">contact us</span>
        </div>

        <div className="postcard">
          {/* left side — message */}
          <div className="postcard__left">
            <h2 className="postcard__heading">
              let's connect, say <span className="postcard__greeting">{greeting}<span className="postcard__cursor">|</span></span> to us.
            </h2>
            <p className="postcard__message">
              need to speak to someone right away? feel free to contact us using the form — or just say hello. we'd love to hear from you.
            </p>
            <div className="postcard__from">
              <p className="postcard__from-label">from athens, with love.</p>
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
                  placeholder="name"
                  required
                />
              </div>
              <div className="postcard__field">
                <input
                  type="email"
                  className="postcard__input"
                  placeholder="email"
                  required
                />
              </div>
              <div className="postcard__field">
                <textarea
                  className="postcard__input postcard__input--textarea"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="message"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className="postcard__submit"
                disabled={isSending || !formMessage.trim()}
              >
                {isSending ? 'sending...' : 'send'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
