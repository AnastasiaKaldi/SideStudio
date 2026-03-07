import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import './Contact.css'

const greetings = [
  'hello',
  'hola',
  'bonjour',
  'ciao',
  'hallo',
  'olá',
  'merhaba',
  'ahoj',
  'hej',
  'namaste',
]

const ease = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

function Contact() {
  const [greeting, setGreeting] = useState('')
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const word = greetings[greetingIndex]
    const timeout = isDeleting ? 50 : 100

    if (!isDeleting && greeting === word) {
      setTimeout(() => setIsDeleting(true), 2000)
      return
    }

    if (isDeleting && greeting === '') {
      setIsDeleting(false)
      setGreetingIndex((prev) => (prev + 1) % greetings.length)
      return
    }

    const timer = setTimeout(() => {
      setGreeting(
        isDeleting
          ? word.substring(0, greeting.length - 1)
          : word.substring(0, greeting.length + 1)
      )
    }, timeout)

    return () => clearTimeout(timer)
  }, [greeting, isDeleting, greetingIndex])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formMessage.trim()) return

    setIsSending(true)
    const mailtoLink = `mailto:sidecreativestudio@gmail.com?subject=new inquiry&body=${encodeURIComponent(formMessage)}`
    window.location.href = mailtoLink
    setTimeout(() => setIsSending(false), 1000)
  }

  return (
    <div className="contact">
      <Helmet>
        <title>contact | side studio</title>
        <meta name="description" content="Get in touch with Side Studio. Based in Athens, Greece — available for creative direction, content, branding, and strategy projects worldwide." />
      </Helmet>

      <motion.div
        className="contact__header"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 variants={fadeUp}>
          say <span className="contact__greeting">{greeting}<span className="contact__cursor">|</span></span>
        </motion.h1>
        <motion.p className="contact__subtitle" variants={fadeUp}>
          good ideas welcome.
        </motion.p>
      </motion.div>

      <motion.div
        className="contact__details"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.3 }}
      >
        <p className="contact__detail">
          <span className="contact__label">(usually answering fast)</span>{' '}
          <a href="mailto:sidecreativestudio@gmail.com" className="contact__email">
            sidecreativestudio@gmail.com
          </a>
        </p>
        <p className="contact__location">located in athens | greece, working everywhere</p>
      </motion.div>

      <motion.div
        className="contact__form-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.p className="contact__form-punchline" variants={fadeUp}>
          good ideas usually start with a message
        </motion.p>

        <motion.form
          className="contact__form"
          ref={formRef}
          onSubmit={handleSubmit}
          variants={fadeUp}
        >
          <textarea
            className="contact__textarea"
            value={formMessage}
            onChange={(e) => setFormMessage(e.target.value)}
            placeholder="briefs also accepted..."
            rows={6}
          />
          <motion.button
            type="submit"
            className="contact__submit"
            disabled={isSending || !formMessage.trim()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {isSending ? 'sending...' : 'send message'}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Contact
