import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import './Services.css'

const services = [
  {
    id: 1,
    title: 'social media management',
    brief: 'end-to-end management of your digital presence.',
    description: 'we handle content strategy, content creation, planning and posting schedules, captions, community management, and performance tracking — ensuring consistent communication and measurable growth across platforms.',
    size: 'tall',
  },
  {
    id: 2,
    title: 'content creation',
    brief: 'original visual content from concept to post-production.',
    description: 'from concept development and moodboard preparation to photography, videography, and full post-production, we create visual assets ready for immediate use across social media, websites, and paid campaigns.',
    size: 'wide',
  },
  {
    id: 3,
    title: 'strategy & planning',
    brief: 'monthly planning aligned with brand goals.',
    description: 'includes content calendars, campaign planning, positioning strategy, and clearly defined kpis to guide consistent growth and communication.',
    size: 'normal',
  },
  {
    id: 4,
    title: 'creative direction',
    brief: 'shaping the core idea behind a brand\'s visual output.',
    description: 'from defining the visual language to translating strategy into creative executions, we ensure that content, campaigns, and design assets remain aligned and coherent across all channels.',
    size: 'large',
  },
  {
    id: 5,
    title: 'design thinking',
    brief: 'branded assets that support consistent communication.',
    description: 'creation of essential branded assets including social media visuals, story templates, promotional graphics, and layout elements that support consistent brand communication.',
    size: 'normal',
  },
  {
    id: 6,
    title: 'ads & reporting',
    brief: 'paid media campaigns, optimized and tracked.',
    description: 'we handle audience targeting, budget allocation, creative alignment, and tracking configuration. monthly reporting includes performance analysis, key insights, and actionable recommendations to improve results.',
    size: 'tall',
  },
  {
    id: 7,
    title: 'consulting',
    brief: 'advisory sessions for brand growth.',
    description: 'clear feedback, structured guidance, and practical next steps tailored to your brand\'s needs — covering brand positioning, content strategy, digital presence, and performance optimization.',
    size: 'wide',
  },
]

const ease = [0.16, 1, 0.3, 1]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

function Services() {
  const [flippedId, setFlippedId] = useState(null)

  const handleCardClick = (id) => {
    setFlippedId(flippedId === id ? null : id)
  }

  return (
    <div className="services">
      <Helmet>
        <title>services | side studio</title>
        <meta name="description" content="Creative services by Side Studio — social media management, content creation, strategy, creative direction, design thinking, ads & reporting, and consulting for modern brands." />
      </Helmet>

      <motion.div
        className="services__header"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 variants={cardVariant}>our services</motion.h1>
        <motion.p className="services__subtitle" variants={cardVariant}>
          what we do and how we help brands grow.
        </motion.p>
      </motion.div>

      <motion.div
        className="services__bento"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            className={`services__card services__card--${service.size} ${flippedId === service.id ? 'services__card--flipped' : ''}`}
            variants={cardVariant}
            onClick={() => handleCardClick(service.id)}
          >
            <div className="services__card-inner">
              {/* FRONT */}
              <div className="services__card-front">
                <div className="services__card-image" />
                <div className="services__card-overlay">
                  <span className="services__card-number">{String(service.id).padStart(2, '0')}</span>
                  <h3 className="services__card-title">{service.title}</h3>
                </div>
              </div>

              {/* BACK */}
              <div className="services__card-back">
                <span className="services__card-number">{String(service.id).padStart(2, '0')}</span>
                <h3 className="services__card-back-title">{service.title}</h3>
                <p className="services__card-back-brief">{service.brief}</p>
                <p className="services__card-back-description">{service.description}</p>
                <Link
                  to="/contact"
                  className="services__card-back-cta"
                  onClick={(e) => e.stopPropagation()}
                >
                  get in touch &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="services__footer-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={staggerContainer}
      >
        <motion.p className="services__closing" variants={cardVariant}>
          good work usually starts with a conversation.
        </motion.p>
        <motion.div variants={cardVariant}>
          <Link to="/contact" className="services__cta">— get in touch</Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Services
