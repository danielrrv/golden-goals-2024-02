module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"]
};
