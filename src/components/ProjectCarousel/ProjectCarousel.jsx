import { useState, useRef } from 'react'
import './ProjectCarousel.css'

const projects = [
  { id: 1, title: 'brand identity', description: 'a complete visual identity built from scratch — logo, color system, typography, and brand guidelines that set the tone for everything that followed.', image: '/carousel/brandidentity.jpg' },
  { id: 2, title: 'campaign shoot', description: 'a full-day production with art direction, styling, and photography — delivering a library of assets ready for social, web, and print.', image: '/carousel/campaignshoot.jpg' },
  { id: 3, title: 'social strategy', description: 'a 6-month content strategy that redefined the brand\'s online voice — from planning to execution, resulting in consistent growth and engagement.', image: '/carousel/socialstrategy.jpg' },
  { id: 4, title: 'visual storytelling', description: 'a series of short-form videos and photo narratives crafted to communicate the brand\'s values through emotion and atmosphere.', image: '/carousel/visualstorytelling.jpg' },
  { id: 5, title: 'product launch', description: 'end-to-end creative direction for a product launch — concept, content production, paid campaigns, and performance tracking.', image: '/carousel/productlaunch.jpg' },
  { id: 6, title: 'editorial design', description: 'a print and digital editorial project blending photography, layout design, and copywriting into a cohesive visual narrative.', image: '/carousel/editorialdesign.jpg' },
  { id: 7, title: 'art direction', description: 'shaping the creative vision behind a brand\'s visual output — from mood and tone to final execution across all touchpoints.', image: '/carousel/artdirection.jpg' },
]

function ProjectCarousel() {
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
    <div className="project-carousel">
      <div className="project-carousel__track-wrapper">
        <div className="project-carousel__track">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-carousel__item ${activeProject?.id === project.id ? 'project-carousel__item--active' : ''} ${hoveredProject && hoveredProject !== project.id ? 'project-carousel__item--dimmed' : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="project-carousel__image"
                style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectCarousel
