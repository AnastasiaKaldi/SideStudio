import { useState, useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import './ProjectCarousel.css'

const projectImages = [
  '/carousel/brandidentity.jpg',
  '/carousel/campaignshoot.jpg',
  '/carousel/socialstrategy.jpg',
  '/carousel/visualstorytelling.jpg',
  '/carousel/productlaunch.jpg',
  '/carousel/editorialdesign.jpg',
  '/carousel/artdirection.jpg',
]

function ProjectCarousel() {
  const { t } = useLanguage()
  const projects = t('projects')
  const [hoveredProject, setHoveredProject] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const expandedRef = useRef(null)

  const handleProjectClick = (project, index) => {
    if (activeProject?.id === project.id) {
      setActiveProject(null)
    } else {
      setActiveProject({ ...project, image: projectImages[index] })
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }

  return (
    <div className="project-carousel">
      <div className="project-carousel__track-wrapper">
        <div className="project-carousel__track">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-carousel__item ${activeProject?.id === project.id ? 'project-carousel__item--active' : ''} ${hoveredProject && hoveredProject !== project.id ? 'project-carousel__item--dimmed' : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project, index)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="project-carousel__image"
                style={{ backgroundImage: `url(${projectImages[index]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="project-carousel__image-overlay" />
                <span className="project-carousel__number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="project-carousel__item-footer">
                <span className="project-carousel__label">{project.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeProject && (
        <div
          ref={expandedRef}
          className="project-carousel__expanded"
        >
          <div className="project-carousel__expanded-inner">
            <div className="project-carousel__expanded-image" style={{ backgroundImage: `url(${activeProject.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <span className="project-carousel__expanded-number">
                {String(activeProject.id).padStart(2, '0')}
              </span>
            </div>
            <div className="project-carousel__expanded-text">
              <h3 className="project-carousel__expanded-title">
                {activeProject.title}
              </h3>
              <p className="project-carousel__expanded-description">
                {activeProject.description}
              </p>
              <button
                className="project-carousel__expanded-close"
                onClick={() => setActiveProject(null)}
              >
                {t('projectClose')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectCarousel
