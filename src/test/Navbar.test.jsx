import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from './helpers'
import Navbar from '../components/Navbar/Navbar'

describe('Navbar', () => {
  it('renders logo text on home page', () => {
    renderWithProviders(<Navbar />, { route: '/' })
    expect(screen.getByText('side creative studio')).toBeInTheDocument()
  })

  it('renders logo image on non-home pages', () => {
    renderWithProviders(<Navbar />, { route: '/about' })
    expect(screen.getByAltText('S/DE')).toBeInTheDocument()
  })

  it('renders nav links', () => {
    renderWithProviders(<Navbar />, { route: '/' })
    expect(screen.getByText('about')).toBeInTheDocument()
    expect(screen.getByText('services')).toBeInTheDocument()
    expect(screen.getByText('contact')).toBeInTheDocument()
  })

  it('renders language switcher', () => {
    renderWithProviders(<Navbar />, { route: '/' })
    expect(screen.getByText('gr')).toBeInTheDocument()
    expect(screen.getByText('en')).toBeInTheDocument()
  })

  it('toggles mobile menu on hamburger click', () => {
    renderWithProviders(<Navbar />, { route: '/' })
    const hamburger = screen.getByLabelText('Toggle menu')
    fireEvent.click(hamburger)
    const navRight = document.querySelector('.navbar__right')
    expect(navRight.classList.contains('navbar__right--open')).toBe(true)
  })

  it('switches language to Greek on click', () => {
    renderWithProviders(<Navbar />, { route: '/' })
    fireEvent.click(screen.getByText('gr'))
    expect(screen.getByText('σχετικά')).toBeInTheDocument()
  })

  it('applies dark class on about page', () => {
    renderWithProviders(<Navbar />, { route: '/about' })
    const nav = document.querySelector('.navbar')
    expect(nav.classList.contains('navbar--dark')).toBe(true)
  })

  it('does not apply dark class on home page', () => {
    renderWithProviders(<Navbar />, { route: '/' })
    const nav = document.querySelector('.navbar')
    expect(nav.classList.contains('navbar--dark')).toBe(false)
  })
})
