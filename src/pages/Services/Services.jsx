import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import SectionNav from '../../components/SectionNav/SectionNav'
import './Services.css'

const sections = [
  { id: 'all', label: 'all' },
  { id: 'social-media', label: 'social media' },
  { id: 'content', label: 'content' },
  { id: 'strategy', label: 'strategy' },
  { id: 'creative-direction', label: 'creative direction' },
  { id: 'design-thinking', label: 'design thinking' },
  { id: 'reporting', label: 'reporting' },
  { id: 'consulting', label: 'consulting' },
]

const serviceWords = [
  'social media',
  'content creation',
  'strategy',
  'creative direction',
  'design thinking',
  "ads n' reporting",
  'consulting',
]

const ease = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

function Services() {
  const [activeSection, setActiveSection] = useState('all')
  const [currentWord, setCurrentWord] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = serviceWords[currentWord]
    const timeout = isDeleting ? 40 : 80

    if (!isDeleting && displayText === word) {
      setTimeout(() => setIsDeleting(true), 1500)
      return
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setCurrentWord((prev) => (prev + 1) % serviceWords.length)
      return
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? word.substring(0, displayText.length - 1)
          : word.substring(0, displayText.length + 1)
      )
    }, timeout)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentWord])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

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
        <motion.h1 variants={fadeUp}>our services</motion.h1>
        <motion.p className="services__subtitle" variants={fadeUp}>
          what we do and how we help brands grow.
        </motion.p>
        <motion.p className="services__dynamic" variants={fadeUp}>
          side studio services designed to shape brands through{' '}
          <span className="services__typewriter">{displayText}<span className="services__cursor">|</span></span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
      >
        <SectionNav sections={sections} activeSection={activeSection} />
      </motion.div>

      <div className="services__content">
        <motion.section
          id="all"
          className="services__section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="services__section-inner">
            <motion.p className="services__punchline" variants={fadeUp}>the brief said |surprise us|. we did.</motion.p>
            <motion.p variants={fadeUp}>
              at side studio, strategy, creativity, and execution move together. we support brands through clear direction, thoughtful design, and content that communicates with consistency and purpose.
            </motion.p>
            <motion.p variants={fadeUp}>
              from shaping the core idea behind a brand to producing visual content and managing its digital presence, every service is part of a structured approach designed to create meaningful and measurable results.
            </motion.p>
          </div>
        </motion.section>

        {[
          { id: 'social-media', title: 'social media management', paragraphs: [
            'end-to-end management of your social media presence.',
            'we handle content strategy, content creation, planning and posting schedules, captions, community management, and performance tracking — ensuring consistent communication and measurable growth across platforms.',
          ]},
          { id: 'content', title: 'content creation', paragraphs: [
            'original visual content developed around your brand identity and strategic direction.',
            'from concept development and moodboard preparation to photography, videography, and full post-production, we create visual assets ready for immediate use across social media, websites, and paid campaigns.',
          ]},
          { id: 'strategy', title: 'strategy and planning', paragraphs: [
            'monthly planning aligned with brand goals and audience insights.',
            'includes content calendars, campaign planning, positioning strategy, and clearly defined kpis to guide consistent growth and communication.',
          ]},
          { id: 'creative-direction', title: 'creative direction', paragraphs: [
            'we shape the core idea behind a brand\'s visual and communication output.',
            'from defining the visual language to translating strategy into creative executions, we ensure that content, campaigns, and design assets remain aligned and coherent across all channels.',
          ]},
          { id: 'design-thinking', title: 'design thinking', paragraphs: [
            'creation of essential branded assets including social media visuals, story templates, promotional graphics, and layout elements that support consistent brand communication.',
          ]},
          { id: 'reporting', title: 'ads and reporting', paragraphs: [
            'setup, management, and optimization of paid media campaigns.',
            'we handle audience targeting, budget allocation, creative alignment, and tracking configuration. monthly reporting includes performance analysis, key insights, and actionable recommendations to improve results.',
          ]},
          { id: 'consulting', title: 'consulting', paragraphs: [
            'advisory sessions focused on brand positioning, content strategy, digital presence, and performance optimization.',
            'clear feedback, structured guidance, and practical next steps tailored to your brand\'s needs.',
          ]},
        ].map((section) => (
          <motion.section
            key={section.id}
            id={section.id}
            className="services__section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <div className="services__section-inner">
              <motion.h2 variants={fadeUp}>{section.title}</motion.h2>
              {section.paragraphs.map((text, i) => (
                <motion.p key={i} variants={fadeUp}>{text}</motion.p>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <motion.div
        className="services__footer-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={staggerContainer}
      >
        <motion.p className="services__closing" variants={fadeUp}>good work usually starts with a conversation.</motion.p>
        <motion.p className="services__closing" variants={fadeUp}>if you're thinking about your brand's next step, we'd love to hear about it.</motion.p>
        <motion.div variants={fadeUp}>
          <Link to="/contact" className="services__cta">— get in touch</Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Services
