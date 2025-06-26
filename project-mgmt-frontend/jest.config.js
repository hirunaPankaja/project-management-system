module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|scss|png|jpg|jpeg|svg)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"]
};
