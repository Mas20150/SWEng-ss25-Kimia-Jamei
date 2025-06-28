/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/Test/**/*.test.ts'],  
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/public/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: "jsdom",

};
