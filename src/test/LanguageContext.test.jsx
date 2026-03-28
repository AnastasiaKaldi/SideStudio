import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '../context/LanguageContext'

function TestConsumer() {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="translated">{t('navAbout')}</span>
      <button onClick={() => setLanguage('gr')}>switch to gr</button>
      <button onClick={() => setLanguage('en')}>switch to en</button>
    </div>
  )
}

describe('LanguageContext', () => {
  it('defaults to English', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
  })

  it('translates keys in English', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )
    expect(screen.getByTestId('translated')).toHaveTextContent('about')
  })

  it('switches to Greek', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('switch to gr'))
    expect(screen.getByTestId('lang')).toHaveTextContent('gr')
  })

  it('translates keys in Greek after switch', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('switch to gr'))
    expect(screen.getByTestId('translated')).toHaveTextContent('σχετικά')
  })

  it('returns key if translation is missing', () => {
    function MissingKeyConsumer() {
      const { t } = useLanguage()
      return <span data-testid="missing">{t('nonExistentKey')}</span>
    }
    render(
      <LanguageProvider>
        <MissingKeyConsumer />
      </LanguageProvider>
    )
    expect(screen.getByTestId('missing')).toHaveTextContent('nonExistentKey')
  })
})
