import { Link } from 'react-router-dom'
import './Landing.css'

function Landing() {
  return (
    <div className="landing">
      <section className="landing__section landing__section--hero">
        <div className="landing__hero">
          <img src="/hero.png" alt="side creative studio" className="landing__hero-image" />
        </div>
        <div className="landing__logo">
          <img src="/logo.png" alt="S/DE" className="landing__logo-image" />
        </div>
      </section>

      <section className="landing__section landing__section--video">
        <div className="landing__video-placeholder">
          <span>video</span>
        </div>
      </section>

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
            <span className="landing__intro-label">about</span>
            <Link to="/about" className="landing__intro-link">read more</Link>
          </div>

          <div className="landing__intro-cards">
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
      </section>
    </div>
  )
}

export default Landing
