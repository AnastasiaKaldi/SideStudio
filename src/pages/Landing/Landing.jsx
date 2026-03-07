import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import './Landing.css'

const services = [
  {
    id: 1,
    title: 'creative direction',
    description: 'shaping the core idea behind a brand\'s visual and communication output across all channels.',
    image: '/service-creative.jpg',
  },
  {
    id: 2,
    title: 'content creation',
    description: 'original visual content from concept to post-production — photography, videography, and design.',
    image: '/service-content.jpg',
  },
  {
    id: 3,
    title: 'strategy & planning',
    description: 'monthly planning aligned with brand goals — content calendars, campaigns, and kpis.',
    image: '/service-strategy.jpg',
  },
  {
    id: 4,
    title: 'social media',
    description: 'end-to-end management of your digital presence — content, community, and growth.',
    image: '/service-social.jpg',
  },
]

const projects = [
  { id: 1, title: 'brand identity', description: 'a complete visual identity built from scratch — logo, color system, typography, and brand guidelines that set the tone for everything that followed.' },
  { id: 2, title: 'campaign shoot', description: 'a full-day production with art direction, styling, and photography — delivering a library of assets ready for social, web, and print.' },
  { id: 3, title: 'social strategy', description: 'a 6-month content strategy that redefined the brand\'s online voice — from planning to execution, resulting in consistent growth and engagement.' },
  { id: 4, title: 'visual storytelling', description: 'a series of short-form videos and photo narratives crafted to communicate the brand\'s values through emotion and atmosphere.' },
  { id: 5, title: 'product launch', description: 'end-to-end creative direction for a product launch — concept, content production, paid campaigns, and performance tracking.' },
  { id: 6, title: 'editorial design', description: 'a print and digital editorial project blending photography, layout design, and copywriting into a cohesive visual narrative.' },
  { id: 7, title: 'art direction', description: 'shaping the creative vision behind a brand\'s visual output — from mood and tone to final execution across all touchpoints.' },
]

const ease = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
}

function Landing() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const expandedRef = useRef(null)

  const handleProjectClick = (project) => {
    if (activeProject?.id === project.id) {
      setActiveProject(null)
    } else {
      setActiveProject(project)
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }

  return (
    <div className="landing">
      <Helmet>
        <title>side studio | creative direction, content & strategy</title>
        <meta name="description" content="Born as a side project, built with intention. Side Studio shapes contemporary brands through strategic creative direction, character-led content, and purposeful design." />
      </Helmet>

      {/* HERO */}
      <section className="landing__section landing__section--hero">
        <motion.div
          className="landing__hero"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <img src="/hero.png" alt="side creative studio" className="landing__hero-image" />
        </motion.div>
        <motion.div
          className="landing__logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
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
        transition={{ duration: 1, ease }}
      >
        <video
          className="landing__video"
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.section>

      {/* INTRO */}
      <section className="landing__section landing__section--intro">
        <motion.div
          className="landing__intro"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 className="landing__intro-headline" variants={staggerItem}>
            Side Creative Studio is a dynamic platform showcasing a diverse and captivating creative portfolio.
          </motion.h2>
          <motion.p variants={staggerItem}>
            Based in a vibrant city, we are passionate about transforming concepts into compelling visual narratives through our expertise in art direction, photography, and styling.
          </motion.p>
          <motion.p variants={staggerItem}>
            Our visual storytelling is a testament to our commitment to delivering pure visual language that resonates with the audience.
          </motion.p>

          <motion.div className="landing__intro-about" variants={staggerItem}>
            <span className="landing__intro-label">about</span>
            <Link to="/about" className="landing__intro-link">read more</Link>
          </motion.div>

          <div className="landing__intro-cards">
            <div className="landing__intro-card-wrapper">
              <Link to="/about" className="flip-card">
                <div className="flip-card__inner">
                  <div className="flip-card__front">
                    <img src="/aboutpagenikos.jpg" alt="nikos" className="flip-card__image" />
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
                    <img src="/aboutpagenikol.jpg" alt="nikol" className="flip-card__image" />
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
        </motion.div>
      </section>

      {/* SERVICES CAROUSEL */}
      <section className="landing__section landing__section--services">
        <div className="services-carousel">
          <motion.h2
            className="services-carousel__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease }}
          >
            what we do
          </motion.h2>
          <motion.p
            className="services-carousel__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            a selection of projects we've brought to life.
          </motion.p>

          <div className="services-carousel__track-wrapper">
            <motion.div
              className="services-carousel__track"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`services-carousel__item ${activeProject?.id === project.id ? 'services-carousel__item--active' : ''} ${hoveredProject && hoveredProject !== project.id ? 'services-carousel__item--dimmed' : ''}`}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleProjectClick(project)}
                  style={{ cursor: 'pointer' }}
                >
                  <motion.div
                    className="services-carousel__image"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <div className="services-carousel__image-overlay" />
                    <span className="services-carousel__number">{String(index + 1).padStart(2, '0')}</span>
                  </motion.div>
                  <div className="services-carousel__item-footer">
                    <span className="services-carousel__label">{project.title}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <AnimatePresence>
            {activeProject && (
              <motion.div
                ref={expandedRef}
                className="services-carousel__expanded"
                key={activeProject.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="services-carousel__expanded-inner">
                  <div className="services-carousel__expanded-image">
                    <div className="services-carousel__expanded-image-bg" />
                    <span className="services-carousel__expanded-number">
                      {String(activeProject.id).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="services-carousel__expanded-text">
                    <motion.h3
                      className="services-carousel__expanded-title"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.15 }}
                    >
                      {activeProject.title}
                    </motion.h3>
                    <motion.p
                      className="services-carousel__expanded-description"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.25 }}
                    >
                      {activeProject.description}
                    </motion.p>
                    <motion.button
                      className="services-carousel__expanded-close"
                      onClick={() => setActiveProject(null)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.35 }}
                    >
                      close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SERVICES CARDS */}
      <section className="landing__section landing__section--service-cards">
        <motion.div
          className="service-cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 className="service-cards__title" variants={staggerItem}>
            our services
          </motion.h2>
          <motion.p className="service-cards__subtitle" variants={staggerItem}>
            what we bring to the table.
          </motion.p>

          <motion.div
            className="service-cards__grid"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="service-card"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                }}
              >
                <div className="service-card__inner">
                  <div className="service-card__front">
                    <div className="service-card__image-placeholder" />
                    <span className="service-card__front-label">{service.title}</span>
                  </div>
                  <div className="service-card__back">
                    <h3 className="service-card__back-title">{service.title}</h3>
                    <p className="service-card__back-text">{service.description}</p>
                    <Link to="/services" className="service-card__back-cta">
                      learn more &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default Landing
