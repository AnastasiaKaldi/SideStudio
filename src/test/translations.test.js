import translations from '../translations'

describe('translations', () => {
  it('has en and gr languages', () => {
    expect(translations).toHaveProperty('en')
    expect(translations).toHaveProperty('gr')
  })

  it('en has all required navbar keys', () => {
    const { en } = translations
    expect(en.navLogo).toBeDefined()
    expect(en.navAbout).toBeDefined()
    expect(en.navServices).toBeDefined()
    expect(en.navContact).toBeDefined()
  })

  it('gr has all required navbar keys', () => {
    const { gr } = translations
    expect(gr.navAbout).toBeDefined()
    expect(gr.navServices).toBeDefined()
    expect(gr.navContact).toBeDefined()
  })

  it('en has 8 services', () => {
    expect(translations.en.services).toHaveLength(8)
  })

  it('gr has 8 services', () => {
    expect(translations.gr.services).toHaveLength(8)
  })

  it('each service has required fields', () => {
    translations.en.services.forEach((s) => {
      expect(s).toHaveProperty('id')
      expect(s).toHaveProperty('title')
      expect(s).toHaveProperty('brief')
      expect(s).toHaveProperty('description')
    })
  })

  it('en and gr have matching keys', () => {
    const enKeys = Object.keys(translations.en).sort()
    const grKeys = Object.keys(translations.gr).sort()
    expect(enKeys).toEqual(grKeys)
  })

  it('services page tabs exist in both languages', () => {
    expect(translations.en.servicesPageTabs).toBeDefined()
    expect(translations.gr.servicesPageTabs).toBeDefined()
    expect(Array.isArray(translations.en.servicesPageTabs)).toBe(true)
  })

  it('services page sections exist and have required fields', () => {
    translations.en.servicesPageSections.forEach((s) => {
      expect(s).toHaveProperty('id')
      expect(s).toHaveProperty('title')
      expect(s).toHaveProperty('bold')
      expect(s).toHaveProperty('text')
    })
  })

  it('about page bio arrays are non-empty', () => {
    expect(translations.en.aboutNikosBio.length).toBeGreaterThan(0)
    expect(translations.en.aboutNikolBio.length).toBeGreaterThan(0)
  })

  it('contact form keys exist', () => {
    expect(translations.en.contactName).toBeDefined()
    expect(translations.en.contactEmail).toBeDefined()
    expect(translations.en.contactCompany).toBeDefined()
    expect(translations.en.contactSuccess).toBeDefined()
    expect(translations.en.contactError).toBeDefined()
  })
})
