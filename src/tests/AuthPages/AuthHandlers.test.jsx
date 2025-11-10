/* eslint-env jest */
import '@testing-library/jest-dom';
import {
    signInWithPopup,
    sendPasswordResetEmail,
    confirmPasswordReset
} from "firebase/auth";
import {
    signInWithGoogle,
    signInWithGitHub,
    resetPassword,
    confirmResetPassword
} from "@/firebase/authMethods.js";


global.alert = jest.fn();

describe("Auth handlers", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Google sign-in: successful login", async () => {
        signInWithPopup.mockResolvedValueOnce({ user: { uid: "123" } });
        await signInWithGoogle();
        expect(global.alert).toHaveBeenCalledWith("Sign in with Google successfully!");
    });

    test("GitHub sign-in: login error", async () => {
        signInWithPopup.mockRejectedValueOnce(new Error("auth error"));
        await signInWithGitHub();
        expect(global.alert).toHaveBeenCalledWith("auth error");
    });

    test("Forgot password: successful", async () => {
        sendPasswordResetEmail.mockResolvedValueOnce();
        await resetPassword("test@example.com");
        expect(global.alert).toHaveBeenCalledWith("Password reset email sent successfully!");
    });

    test("Confirm reset password: successful", async () => {
        confirmPasswordReset.mockResolvedValueOnce();
        await confirmResetPassword("fakeCode", "newPass123");
        expect(global.alert).toHaveBeenCalledWith("Password reset successfully!");
    });
});
