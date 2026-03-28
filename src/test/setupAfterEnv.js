import '@testing-library/jest-dom'

window.scrollTo = () => {}
Element.prototype.scrollIntoView = () => {}

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }
}
