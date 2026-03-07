import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
      <div className="services__header">
        <h1>our services</h1>
        <p className="services__subtitle">what we do and how we help brands grow.</p>
        <p className="services__dynamic">
          side studio services designed to shape brands through{' '}
          <span className="services__typewriter">{displayText}<span className="services__cursor">|</span></span>
        </p>
      </div>

      <SectionNav sections={sections} activeSection={activeSection} />

      <div className="services__content">
        <section id="all" className="services__section">
          <div className="services__section-inner">
            <p className="services__punchline">the brief said |surprise us|. we did.</p>
            <p>
              at side studio, strategy, creativity, and execution move together. we support brands through clear direction, thoughtful design, and content that communicates with consistency and purpose.
            </p>
            <p>
              from shaping the core idea behind a brand to producing visual content and managing its digital presence, every service is part of a structured approach designed to create meaningful and measurable results.
            </p>
          </div>
        </section>

        <section id="social-media" className="services__section">
          <div className="services__section-inner">
            <h2>social media management</h2>
            <p>
              end-to-end management of your social media presence.
            </p>
            <p>
              we handle content strategy, content creation, planning and posting schedules, captions, community management, and performance tracking — ensuring consistent communication and measurable growth across platforms.
            </p>
          </div>
        </section>

        <section id="content" className="services__section">
          <div className="services__section-inner">
            <h2>content creation</h2>
            <p>
              original visual content developed around your brand identity and strategic direction.
            </p>
            <p>
              from concept development and moodboard preparation to photography, videography, and full post-production, we create visual assets ready for immediate use across social media, websites, and paid campaigns.
            </p>
          </div>
        </section>

        <section id="strategy" className="services__section">
          <div className="services__section-inner">
            <h2>strategy and planning</h2>
            <p>
              monthly planning aligned with brand goals and audience insights.
            </p>
            <p>
              includes content calendars, campaign planning, positioning strategy, and clearly defined kpis to guide consistent growth and communication.
            </p>
          </div>
        </section>

        <section id="creative-direction" className="services__section">
          <div className="services__section-inner">
            <h2>creative direction</h2>
            <p>
              we shape the core idea behind a brand's visual and communication output.
            </p>
            <p>
              from defining the visual language to translating strategy into creative executions, we ensure that content, campaigns, and design assets remain aligned and coherent across all channels.
            </p>
          </div>
        </section>

        <section id="design-thinking" className="services__section">
          <div className="services__section-inner">
            <h2>design thinking</h2>
            <p>
              creation of essential branded assets including social media visuals, story templates, promotional graphics, and layout elements that support consistent brand communication.
            </p>
          </div>
        </section>

        <section id="reporting" className="services__section">
          <div className="services__section-inner">
            <h2>ads and reporting</h2>
            <p>
              setup, management, and optimization of paid media campaigns.
            </p>
            <p>
              we handle audience targeting, budget allocation, creative alignment, and tracking configuration. monthly reporting includes performance analysis, key insights, and actionable recommendations to improve results.
            </p>
          </div>
        </section>

        <section id="consulting" className="services__section">
          <div className="services__section-inner">
            <h2>consulting</h2>
            <p>
              advisory sessions focused on brand positioning, content strategy, digital presence, and performance optimization.
            </p>
            <p>
              clear feedback, structured guidance, and practical next steps tailored to your brand's needs.
            </p>
          </div>
        </section>
      </div>

      <div className="services__footer-cta">
        <p className="services__closing">good work usually starts with a conversation.</p>
        <p className="services__closing">if you're thinking about your brand's next step, we'd love to hear about it.</p>
        <Link to="/contact" className="services__cta">— get in touch</Link>
      </div>
    </div>
  )
}

export default Services
