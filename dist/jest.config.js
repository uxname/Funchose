"use strict";
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 5,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};
//# sourceMappingURL=jest.config.js.map