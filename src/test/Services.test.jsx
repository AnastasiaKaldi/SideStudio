import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from './helpers'
import Services from '../pages/Services/Services'

describe('Services', () => {
  it('renders the hero title', () => {
    renderWithProviders(<Services />, { route: '/services' })
    const title = document.querySelector('.services-page__title')
    expect(title).toBeInTheDocument()
    expect(title.textContent).toBeTruthy()
  })

  it('renders the hero subtitle', () => {
    renderWithProviders(<Services />, { route: '/services' })
    const subtitle = document.querySelector('.services-page__subtitle')
    expect(subtitle).toBeInTheDocument()
  })

  it('renders tabs (excluding "all")', () => {
    renderWithProviders(<Services />, { route: '/services' })
    const tabs = document.querySelectorAll('.services-page__tab')
    expect(tabs.length).toBeGreaterThan(0)
  })

  it('renders service sections', () => {
    renderWithProviders(<Services />, { route: '/services' })
    const sections = document.querySelectorAll('.services-page__section')
    expect(sections.length).toBeGreaterThan(1) // all intro + individual sections
  })

  it('renders section titles', () => {
    renderWithProviders(<Services />, { route: '/services' })
    const titles = document.querySelectorAll('.services-page__section-title')
    expect(titles.length).toBeGreaterThan(0)
    titles.forEach((t) => expect(t.textContent).toBeTruthy())
  })

  it('renders the CTA section', () => {
    renderWithProviders(<Services />, { route: '/services' })
    const cta = document.querySelector('.services-page__footer-cta')
    expect(cta).toBeInTheDocument()
  })

  it('renders the get in touch link', () => {
    renderWithProviders(<Services />, { route: '/services' })
    expect(screen.getByText('— get in touch')).toBeInTheDocument()
  })

  it('sets active tab on click', () => {
    renderWithProviders(<Services />, { route: '/services' })
    const tabs = document.querySelectorAll('.services-page__tab')
    fireEvent.click(tabs[0])
    expect(tabs[0].classList.contains('services-page__tab--active')).toBe(true)
  })

  it('renders the all services intro section', () => {
    renderWithProviders(<Services />, { route: '/services' })
    const allSection = document.querySelector('.services-page__section--all')
    expect(allSection).toBeInTheDocument()
  })
})
