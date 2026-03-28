import { screen } from '@testing-library/react'
import { renderWithProviders } from './helpers'
import Footer from '../components/Footer/Footer'

describe('Footer', () => {
  it('renders the logo', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByAltText('S/DE')).toBeInTheDocument()
  })

  it('renders nav links', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText('about')).toBeInTheDocument()
    expect(screen.getByText('services')).toBeInTheDocument()
    expect(screen.getByText('contact')).toBeInTheDocument()
  })

  it('renders social links', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText('instagram')).toBeInTheDocument()
    expect(screen.getByText('pinterest')).toBeInTheDocument()
    expect(screen.getByText('linkedin')).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    renderWithProviders(<Footer />)
    const copyright = document.querySelector('.footer__copyright')
    expect(copyright).toBeInTheDocument()
    expect(copyright.textContent).toBeTruthy()
  })

  it('renders legal links', () => {
    renderWithProviders(<Footer />)
    const legalLinks = document.querySelectorAll('.footer__legal-link')
    expect(legalLinks.length).toBe(2)
  })
})
