import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'lib/**/*.ts',
    '!lib/**/*.d.ts',
    '!lib/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '^bigquery-orm$': '<rootDir>/lib/index.ts',
  },
  setupFilesAfterEnv: [],
};

export default config;