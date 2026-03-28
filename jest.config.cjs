module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/src/test/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupAfterEnv.js'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg|mp4)$': '<rootDir>/src/test/fileMock.js',
  },
  extensionsToTreatAsEsm: ['.jsx'],
  transform: {
    '^.+\\.m?[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(framer-motion|motion-dom|motion-utils|react-router|react-router-dom|react-helmet-async)/)',
  ],
}
