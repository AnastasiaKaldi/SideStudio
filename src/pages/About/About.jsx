import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import AboutFooter from '../../components/AboutFooter/AboutFooter'
import './About.css'

const ease = [0.25, 0.1, 0.25, 1]

function About() {
  useEffect(() => {
    document.body.classList.add('about-page')
    return () => document.body.classList.remove('about-page')
  }, [])

  return (
    <div className="about">
      <Helmet>
        <title>about | side studio</title>
        <meta name="description" content="Born as a side project, built with intention. Side Studio is a creative space shaping contemporary brands at the intersection of creative direction, cohesive content, and intentional design." />
      </Helmet>

      <section className="about__welcome">
        <motion.h1
          className="about__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease }}
        >
          Welcome to Side Creative Studio
        </motion.h1>

        <div className="about__text-block">
          {[
            'Welcome to Side Creative Studio, where creativity knows no bounds. Our studio is a dynamic space where ideas come to life and imagination takes center stage. We are passionate about crafting compelling visual stories that resonate with audiences, and we believe in the power of design to make a lasting impact.',
            "At Side Creative Studio, we don't just create; we collaborate.",
            "Our team is dedicated to understanding your vision and bringing it to fruition. Whether you're a startup, a small business, or a global brand, we're here to elevate your brand presence and deliver outstanding creative solutions. This is where creativity meets innovation, and we're excited to embark on this creative journey with you.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease, delay: 0.3 + i * 0.15 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="about__signature"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.6 }}
        >
          <img src="/doublens.png" alt="by the double N's" className="about__signature-img" loading="lazy" />
        </motion.div>
      </section>

      <section className="about__people">
        {/* NIKOLAOS */}
        <div className="about__person">
          <motion.div
            className="about__person-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14, delayChildren: 0 } },
            }}
          >
            <motion.h2
              className="about__person-name"
              variants={{
                hidden: { opacity: 0, x: -30, letterSpacing: '0.15em' },
                visible: {
                  opacity: 1,
                  x: 0,
                  letterSpacing: '0.05em',
                  transition: { duration: 1.2, ease },
                },
              }}
            >
              NIKOLAOS
            </motion.h2>

            <div className="about__person-bio">
              {[
                'Nikos sees creation as a quiet release from the limits of logic. A way for thought to move freely, without needing permission or explanation.',
                'Rooted in surrealism, he believes thought finds its purest form when control recedes and perception drifts through instinct, dreams, and the subconscious, allowing meaning to come into focus.',
                'Through this perspective, creativity is a way of experiencing the world beyond the obvious, where the unconscious speaks freely and imagination uncovers truths deeper than logic, translating feeling into form.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <div className="about__person-image">
            <img src="/aboutpagenikos.jpg" alt="nikolaos" loading="lazy" />
          </div>
        </div>

        {/* NIKOLETA */}
        <div className="about__person about__person--reverse">
          <motion.div
            className="about__person-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14, delayChildren: 0 } },
            }}
          >
            <motion.h2
              className="about__person-name"
              variants={{
                hidden: { opacity: 0, x: 30, letterSpacing: '0.15em' },
                visible: {
                  opacity: 1,
                  x: 0,
                  letterSpacing: '0.05em',
                  transition: { duration: 1.2, ease },
                },
              }}
            >
              NIKOLETA
            </motion.h2>

            <div className="about__person-bio">
              {[
                "Nikol is drawn to authenticity. Her thinking is grounded in structure, strategy, and the technical side of marketing and photography.",
                "She's obsessed with aesthetics, but lives for the tension between logic and imagination. That extreme balance is what excites her — what keeps her awake at night, already chasing what's coming next.",
                "A natural observer, she treats the world as an endless source of reference and inspiration. In her mind, creativity blends seamlessly with logic, keeps moving forward, and never really switches off.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <div className="about__person-image">
            <img src="/aboutpagenikol.jpg" alt="nikoleta" loading="lazy" />
          </div>
        </div>
      </section>

      <AboutFooter />
    </div>
  )
}

export default About
