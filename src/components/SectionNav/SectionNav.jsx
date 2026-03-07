import './SectionNav.css'

function SectionNav({ sections, activeSection }) {
  const handleClick = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="section-nav">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`section-nav__item ${activeSection === section.id ? 'section-nav__item--active' : ''}`}
          onClick={() => handleClick(section.id)}
        >
          {section.label}
        </button>
      ))}
    </div>
  )
}

export default SectionNav
