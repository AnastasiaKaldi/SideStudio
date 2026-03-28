import { TextEncoder, TextDecoder } from 'util'

globalThis.TextEncoder = TextEncoder
globalThis.TextDecoder = TextDecoder

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = MockIntersectionObserver
