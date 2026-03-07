import { useState, useEffect, useRef } from 'react'
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
      <div className="contact__header">
        <h1>
          say <span className="contact__greeting">{greeting}<span className="contact__cursor">|</span></span>
        </h1>
        <p className="contact__subtitle">good ideas welcome.</p>
      </div>

      <div className="contact__details">
        <p className="contact__detail">
          <span className="contact__label">(usually answering fast)</span>{' '}
          <a href="mailto:sidecreativestudio@gmail.com" className="contact__email">
            sidecreativestudio@gmail.com
          </a>
        </p>
        <p className="contact__location">located in athens | greece, working everywhere</p>
      </div>

      <div className="contact__form-section">
        <p className="contact__form-punchline">good ideas usually start with a message</p>

        <form className="contact__form" ref={formRef} onSubmit={handleSubmit}>
          <textarea
            className="contact__textarea"
            value={formMessage}
            onChange={(e) => setFormMessage(e.target.value)}
            placeholder="briefs also accepted..."
            rows={6}
          />
          <button
            type="submit"
            className="contact__submit"
            disabled={isSending || !formMessage.trim()}
          >
            {isSending ? 'sending...' : 'send message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
