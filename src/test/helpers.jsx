import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../context/LanguageContext'
import { HelmetProvider } from 'react-helmet-async'

export function renderWithProviders(ui, { route = '/', ...options } = {}) {
  return render(
    <HelmetProvider>
      <LanguageProvider>
        <MemoryRouter initialEntries={[route]}>
          {ui}
        </MemoryRouter>
      </LanguageProvider>
    </HelmetProvider>,
    options
  )
}
