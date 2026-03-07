import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor/CustomCursor'
import LanguageOverlay from './components/LanguageOverlay/LanguageOverlay'
import Landing from './pages/Landing/Landing'
import About from './pages/About/About'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

const pagesWithOwnFooter = ['/about']

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
}

function AppContent() {
  const location = useLocation()
  const hideGlobalFooter = pagesWithOwnFooter.includes(location.pathname)

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return (
    <div className="app">
      <CustomCursor />
      <LanguageOverlay />
      <Navbar />
      <main className="app__content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
          >
            <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {!hideGlobalFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  )
}

export default App
