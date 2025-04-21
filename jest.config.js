const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // 指向Next.js應用的路徑
  dir: './',
});

// Jest的自定義配置
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // 處理模塊別名
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
};

// createJestConfig會自動處理Next.js特有的設置
module.exports = createJestConfig(customJestConfig); 