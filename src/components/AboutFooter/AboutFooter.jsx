import { Link } from 'react-router-dom'
import './AboutFooter.css'

function AboutFooter() {
  return (
    <footer className="about-footer">
      <div className="about-footer__inner">
        <div className="about-footer__logo">
          <img src="/logowhite.png" alt="S/DE" className="about-footer__logo-img" />
        </div>

        <div className="about-footer__nav">
          <div className="about-footer__nav-group">
            <Link to="/about" className="about-footer__nav-link">about</Link>
            <Link to="/services" className="about-footer__nav-link">services</Link>
            <Link to="/portfolio" className="about-footer__nav-link">studio portfolio</Link>
            <Link to="/contact" className="about-footer__nav-link">contact</Link>
          </div>

          <div className="about-footer__nav-group">
            <span className="about-footer__nav-title">you can stalk us here</span>
            <a href="#" className="about-footer__nav-link">instagram</a>
            <a href="#" className="about-footer__nav-link">pinterest</a>
            <a href="#" className="about-footer__nav-link">linkedin</a>
          </div>
        </div>

        <div className="about-footer__legal">
          <a href="#" className="about-footer__legal-link">privacy policy</a>
          <a href="#" className="about-footer__legal-link">terms & conditions</a>
        </div>

        <div className="about-footer__bottom">
          <span className="about-footer__copyright">all rights reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default AboutFooter