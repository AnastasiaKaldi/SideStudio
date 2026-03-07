import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor/CustomCursor'
import LanguageOverlay from './components/LanguageOverlay/LanguageOverlay'
import Landing from './pages/Landing/Landing'
import About from './pages/About/About'
import Portfolio from './pages/Portfolio/Portfolio'
import Services from './pages/Services/Services'
import Contact from './pages/Contact/Contact'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

const pagesWithOwnFooter = ['/about']

function AppContent() {
  const location = useLocation()
  const hideGlobalFooter = pagesWithOwnFooter.includes(location.pathname)

  return (
    <div className="app">
      <CustomCursor />
      <LanguageOverlay />
      <Navbar />
      <main className="app__content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
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