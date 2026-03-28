import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import App from '../App'

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    )
    expect(document.querySelector('.app')).toBeInTheDocument()
  })

  it('renders the navbar', () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    )
    expect(document.querySelector('.navbar')).toBeInTheDocument()
  })

  it('renders the landing page by default', () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    )
    expect(document.querySelector('.landing')).toBeInTheDocument()
  })
})
