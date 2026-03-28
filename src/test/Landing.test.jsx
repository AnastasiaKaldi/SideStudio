import { screen } from '@testing-library/react'
import { renderWithProviders } from './helpers'
import Landing from '../pages/Landing/Landing'

describe('Landing', () => {
  it('renders the hero image', () => {
    renderWithProviders(<Landing />)
    expect(screen.getByAltText('side creative studio')).toBeInTheDocument()
  })

  it('renders the logo', () => {
    renderWithProviders(<Landing />)
    expect(screen.getByAltText('S/DE')).toBeInTheDocument()
  })

  it('renders the intro headline', () => {
    renderWithProviders(<Landing />)
    const headline = document.querySelector('.landing__intro-headline')
    expect(headline).toBeInTheDocument()
    expect(headline.textContent).toBeTruthy()
  })

  it('renders flip cards with names', () => {
    renderWithProviders(<Landing />)
    const titles = screen.getAllByText(/nicos|nikol/i)
    expect(titles.length).toBeGreaterThanOrEqual(2)
  })

  it('renders the services bento grid', () => {
    renderWithProviders(<Landing />)
    const grid = document.querySelector('.services-bento__grid')
    expect(grid).toBeInTheDocument()
  })

  it('renders 8 bento cards', () => {
    renderWithProviders(<Landing />)
    const cards = document.querySelectorAll('.services-bento__card')
    expect(cards.length).toBe(8)
  })

  it('renders the contact section', () => {
    renderWithProviders(<Landing />)
    const contact = document.querySelector('#contact')
    expect(contact).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    renderWithProviders(<Landing />)
    const form = document.querySelector('.postcard__form')
    expect(form).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    renderWithProviders(<Landing />)
    const inputs = document.querySelectorAll('.postcard__input')
    expect(inputs.length).toBe(4) // name, email, company, message
  })

  it('renders the submit button', () => {
    renderWithProviders(<Landing />)
    const submit = document.querySelector('.postcard__submit')
    expect(submit).toBeInTheDocument()
  })

  it('renders the video element', () => {
    renderWithProviders(<Landing />)
    const video = document.querySelector('.landing__video')
    expect(video).toBeInTheDocument()
    expect(video.getAttribute('src')).toBe('/video.mp4')
  })
})
