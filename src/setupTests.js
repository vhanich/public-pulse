import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

jest.mock("firebase/app", () => ({
    initializeApp: jest.fn(() => ({})),
}));

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(() => ({})),
    GoogleAuthProvider: jest.fn(),
    GithubAuthProvider: jest.fn(),
    signInWithPopup: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    confirmPasswordReset: jest.fn(),
}));
