module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/*.test.ts"
  ],
  moduleFileExtensions: [
    "ts",
    "js",
    "json"
  ],
  roots: [
    "."
  ],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json"
      }
    ]
  },
  setupFilesAfterEnv: [],
  verbose: true
};