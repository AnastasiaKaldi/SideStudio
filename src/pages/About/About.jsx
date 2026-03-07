import { useEffect } from 'react'
import AboutFooter from '../../components/AboutFooter/AboutFooter'
import './About.css'

function About() {
  useEffect(() => {
    document.body.classList.add('about-page')
    return () => document.body.classList.remove('about-page')
  }, [])

  return (
    <div className="about">
      <section className="about__welcome">
        <h1 className="about__title">Welcome to Side Creative Studio</h1>

        <div className="about__text-block">
          <p>
            Welcome to Side Creative Studio, where creativity knows no bounds. Our studio is a dynamic space where ideas come to life and imagination takes center stage. We are passionate about crafting compelling visual stories that resonate with audiences, and we believe in the power of design to make a lasting impact.
          </p>
          <p>
            At Side Creative Studio, we don't just create; we collaborate.
          </p>
          <p>
            Our team is dedicated to understanding your vision and bringing it to fruition. Whether you're a startup, a small business, or a global brand, we're here to elevate your brand presence and deliver outstanding creative solutions. This is where creativity meets innovation, and we're excited to embark on this creative journey with you.
          </p>
        </div>

        <div className="about__signature">
          <img src="/doublens.png" alt="by the double N's" className="about__signature-img" />
        </div>
      </section>

      <section className="about__people">
        <div className="about__person">
          <div className="about__person-text">
            <h2 className="about__person-name">NIKOLAOS</h2>

            <div className="about__person-bio">
              <p>
                Nikos sees creation as a quiet release from the limits of logic. A way for thought to move freely, without needing permission or explanation.
              </p>
              <p>
                Rooted in surrealism, he believes thought finds its purest form when control recedes and perception drifts through instinct, dreams, and the subconscious, allowing meaning to come into focus.
              </p>
              <p>
                Through this perspective, creativity is a way of experiencing the world beyond the obvious, where the unconscious speaks freely and imagination uncovers truths deeper than logic, translating feeling into form.
              </p>
            </div>
          </div>
          <div className="about__person-image">
            <img src="/aboutpagenikos.jpg" alt="nikolaos" />
          </div>
        </div>

        <div className="about__person about__person--reverse">
          <div className="about__person-text">
            <h2 className="about__person-name">NIKOLETA</h2>

            <div className="about__person-bio">
              <p>
                Nikol is drawn to authenticity. Her thinking is grounded in structure, strategy, and the technical side of marketing and photography.
              </p>
              <p>
                She's obsessed with aesthetics, but lives for the tension between logic and imagination. That extreme balance is what excites her — what keeps her awake at night, already chasing what's coming next.
              </p>
              <p>
                A natural observer, she treats the world as an endless source of reference and inspiration. In her mind, creativity blends seamlessly with logic, keeps moving forward, and never really switches off.
              </p>
            </div>
          </div>
          <div className="about__person-image">
            <img src="/aboutpagenikol.jpg" alt="nikoleta" />
          </div>
        </div>
      </section>

      <AboutFooter />
    </div>
  )
}

export default About