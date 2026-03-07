import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ProjectCarousel.css'

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
        <motion.div
          className="project-carousel__track"
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
              className={`project-carousel__item ${activeProject?.id === project.id ? 'project-carousel__item--active' : ''} ${hoveredProject && hoveredProject !== project.id ? 'project-carousel__item--dimmed' : ''}`}
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
                className="project-carousel__image"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className="project-carousel__image-overlay" />
                <span className="project-carousel__number">{String(index + 1).padStart(2, '0')}</span>
              </motion.div>
              <div className="project-carousel__item-footer">
                <span className="project-carousel__label">{project.title}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            ref={expandedRef}
            className="project-carousel__expanded"
            key={activeProject.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="project-carousel__expanded-inner">
              <div className="project-carousel__expanded-image">
                <div className="project-carousel__expanded-image-bg" />
                <span className="project-carousel__expanded-number">
                  {String(activeProject.id).padStart(2, '0')}
                </span>
              </div>
              <div className="project-carousel__expanded-text">
                <motion.h3
                  className="project-carousel__expanded-title"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.15 }}
                >
                  {activeProject.title}
                </motion.h3>
                <motion.p
                  className="project-carousel__expanded-description"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.25 }}
                >
                  {activeProject.description}
                </motion.p>
                <motion.button
                  className="project-carousel__expanded-close"
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
  )
}

export default ProjectCarousel
