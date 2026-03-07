import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Portfolio.css'

const projects = [
  { id: 1, title: 'project one', category: 'branding', description: 'placeholder project description. details about the creative direction and execution will go here.' },
  { id: 2, title: 'project two', category: 'content', description: 'placeholder project description. details about the creative direction and execution will go here.' },
  { id: 3, title: 'project three', category: 'strategy', description: 'placeholder project description. details about the creative direction and execution will go here.' },
]

function Portfolio() {
  const [activeProject, setActiveProject] = useState(null)

  const handleProjectClick = (project) => {
    setActiveProject(project)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setActiveProject(null)
  }

  return (
    <div className="portfolio">
      <div className="portfolio__header">
        <h1>our creative portfolio</h1>
        <p className="portfolio__subtitle">selected work and collaborations.</p>
        <p className="portfolio__intro">
          a growing collection of brands, ideas, and projects we've had the chance to shape. more work is always in progress.
        </p>
      </div>

      {activeProject ? (
        <div className="portfolio__project-detail">
          <button className="portfolio__back" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 16L4 10L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="portfolio__project-content">
            <div className="portfolio__project-hero">
              <div className="portfolio__project-placeholder" />
            </div>
            <h2>{activeProject.title}</h2>
            <span className="portfolio__project-category">{activeProject.category}</span>
            <p>{activeProject.description}</p>

            <div className="portfolio__project-gallery">
              <div className="portfolio__gallery-item">
                <div className="portfolio__project-placeholder" />
              </div>
              <div className="portfolio__gallery-item">
                <div className="portfolio__project-placeholder" />
              </div>
              <div className="portfolio__gallery-item">
                <div className="portfolio__project-placeholder" />
              </div>
              <div className="portfolio__gallery-item">
                <div className="portfolio__project-placeholder" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="portfolio__grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="portfolio__card"
              onClick={() => handleProjectClick(project)}
            >
              <div className="portfolio__card-image">
                <div className="portfolio__card-placeholder" />
              </div>
              <span className="portfolio__card-title">{project.title}</span>
            </div>
          ))}
        </div>
      )}

      <div className="portfolio__footer-cta">
        <p className="portfolio__closing">good work usually starts with a conversation.</p>
        <p className="portfolio__closing">if you're thinking about your brand's next step, we'd love to hear about it.</p>
        <Link to="/contact" className="portfolio__cta">— get in touch</Link>
      </div>
    </div>
  )
}

export default Portfolio
