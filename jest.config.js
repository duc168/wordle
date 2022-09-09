module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1'
   }
}