/** @type {import('jest').Config} */
import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  displayName: 'CLIENT',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  setupFiles: ['<rootDir>/test/setup-env.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_API_BASE_URL: process.env.VITE_API_BASE_URL || '',
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!swiper|ssr-window|dom7)'],
  moduleNameMapper: {
    '\\.(p?css|jpe?g|png|webp)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/test/mocks/svg.ts',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^styles/(.*)$': '<rootDir>/src/styles/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
  },
};
