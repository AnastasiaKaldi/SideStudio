import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo">
          <img src="/logowhite.png" alt="S/DE" className="footer__logo-img" />
        </div>

        <div className="footer__nav">
          <div className="footer__nav-group">
            <Link to="/about" className="footer__nav-link">about</Link>
            <Link to="/services" className="footer__nav-link">services</Link>
            <Link to="/portfolio" className="footer__nav-link">studio portfolio</Link>
            <Link to="/contact" className="footer__nav-link">contact</Link>
          </div>

          <div className="footer__nav-group">
            <span className="footer__nav-title">you can stalk us here</span>
            <a href="#" className="footer__nav-link">instagram</a>
            <a href="#" className="footer__nav-link">pinterest</a>
            <a href="#" className="footer__nav-link">linkedin</a>
          </div>
        </div>

        <div className="footer__legal">
          <a href="#" className="footer__legal-link">privacy policy</a>
          <a href="#" className="footer__legal-link">terms & conditions</a>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">all rights reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer