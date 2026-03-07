import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import AboutFooter from '../../components/AboutFooter/AboutFooter'
import './About.css'

const ease = [0.25, 0.1, 0.25, 1]

function About() {
  const { t } = useLanguage()

  useEffect(() => {
    document.body.classList.add('about-page')
    return () => document.body.classList.remove('about-page')
  }, [])

  return (
    <div className="about">
      <Helmet>
        <title>{t('aboutPageTitle')}</title>
        <meta name="description" content={t('aboutPageDescription')} />
      </Helmet>

      <section className="about__welcome">
        <motion.h1
          className="about__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease }}
        >
          {t('aboutTitle')}
        </motion.h1>

        <div className="about__text-block">
          {t('aboutTexts').map((text, i) => (
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
              {t('aboutNikosName')}
            </motion.h2>

            <div className="about__person-bio">
              {t('aboutNikosBio').map((text, i) => (
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

          <motion.div
            className="about__person-image"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, ease }}
          >
            <img src="/aboutpagenikos.jpg" alt="nikolaos" loading="lazy" />
          </motion.div>
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
              {t('aboutNikolName')}
            </motion.h2>

            <div className="about__person-bio">
              {t('aboutNikolBio').map((text, i) => (
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

          <motion.div
            className="about__person-image"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, ease }}
          >
            <img src="/aboutpagenikol.jpg" alt="nikoleta" loading="lazy" />
          </motion.div>
        </div>
      </section>

      <AboutFooter />
    </div>
  )
}

export default About
