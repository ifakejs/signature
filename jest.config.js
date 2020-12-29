module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', 'dist', 'lib'],
  testRegex: '__test__/(.*|(\\.|/)(test|spec))\\.tsx?$',
  setupFiles: ['jest-canvas-mock']
}
