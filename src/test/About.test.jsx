import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from './helpers'
import About from '../pages/About/About'

describe('About', () => {
  it('renders the hero title', () => {
    renderWithProviders(<About />, { route: '/about' })
    const title = document.querySelector('.about__hero-title')
    expect(title).toBeInTheDocument()
    expect(title.textContent).toBeTruthy()
  })

  it('renders the hero subtitle', () => {
    renderWithProviders(<About />, { route: '/about' })
    const subtitle = document.querySelector('.about__hero-subtitle')
    expect(subtitle).toBeInTheDocument()
  })

  it('renders navigation tabs', () => {
    renderWithProviders(<About />, { route: '/about' })
    const tabs = document.querySelectorAll('.about__tab')
    expect(tabs.length).toBe(3)
  })

  it('sets active tab on click', () => {
    renderWithProviders(<About />, { route: '/about' })
    const tabs = document.querySelectorAll('.about__tab')
    fireEvent.click(tabs[0])
    expect(tabs[0].classList.contains('about__tab--active')).toBe(true)
  })

  it('renders person sections for Nicos and Nikol', () => {
    renderWithProviders(<About />, { route: '/about' })
    const persons = document.querySelectorAll('.about__person')
    expect(persons.length).toBe(2)
  })

  it('renders person names', () => {
    renderWithProviders(<About />, { route: '/about' })
    const names = document.querySelectorAll('.about__person-name')
    expect(names.length).toBe(2)
    expect(names[0].textContent).toBeTruthy()
    expect(names[1].textContent).toBeTruthy()
  })

  it('renders person images', () => {
    renderWithProviders(<About />, { route: '/about' })
    expect(screen.getByAltText('nicos')).toBeInTheDocument()
    expect(screen.getByAltText('nicole')).toBeInTheDocument()
  })

  it('renders the signature', () => {
    renderWithProviders(<About />, { route: '/about' })
    const sig = document.querySelector('.about__signature-img')
    expect(sig).toBeInTheDocument()
  })

  it('renders the quote section', () => {
    renderWithProviders(<About />, { route: '/about' })
    const quote = document.querySelector('.about__quote')
    expect(quote).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    renderWithProviders(<About />, { route: '/about' })
    const cta = document.querySelector('.about__cta-button')
    expect(cta).toBeInTheDocument()
  })

  it('renders content sections', () => {
    renderWithProviders(<About />, { route: '/about' })
    const sections = document.querySelectorAll('.about__section')
    expect(sections.length).toBeGreaterThanOrEqual(3)
  })
})
