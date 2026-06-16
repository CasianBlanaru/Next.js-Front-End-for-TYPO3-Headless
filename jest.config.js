/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // If you have a setup file for Jest, you can add it here, e.g.:
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = config;