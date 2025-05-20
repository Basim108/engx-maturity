module.exports = {
    verbose: true,
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js'],
    bail: 0, // Fail if there are no tests
    collectCoverage: false,
    setupFilesAfterEnv: ['jest-expect-message']
};