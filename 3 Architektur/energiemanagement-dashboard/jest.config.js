/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/Test/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
};

export default {
  roots: ["<rootDir>/Test"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: "jsdom"
};

