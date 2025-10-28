module.exports =  {
    testEnvironment: 'jest-environment-jsdom',
    transform: { '^.+\\.jsx?$': 'babel-jest' },
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // для CSS
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js', // для зображень
    },
};