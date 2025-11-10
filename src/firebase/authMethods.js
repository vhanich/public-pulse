import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    confirmPasswordReset,
} from "firebase/auth";
import { auth } from '@/firebase/config';

// --- EMAIL SIGN-UP ---
export const registerWithEmail = async(email, password) => {
    try{
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created!");
    } catch (error) {
        alert(error.message);
    }
};

// --- EMAIL SIGN-IN ---
export const signInWithEmail = async(email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
        alert("Sign in successfully");
    } catch (error) {
        alert(error.message);
    }
};

// --- GOOGLE SIGN-IN ---
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        alert("Sign in with Google successfully!");
    } catch (error) {
        alert(error.message);
    }
};

// --- GITHUB SIGN-IN ---
const gitHubProvider = new GithubAuthProvider();
export const signInWithGitHub = async () => {
    try {
        await signInWithPopup(auth, gitHubProvider);
        alert("Sign in with GitHub successfully");
    } catch (error) {
        alert(error.message);
    }
};

// --- RESET PASSWORD ---
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent successfully!");
    } catch (err) {
        alert(err.message);
    }
};

// --- CONFIRM RESET PASSWORD ---
export const confirmResetPassword = async (oobCode, newPassword) => {
    try {
        await confirmPasswordReset(auth, oobCode, newPassword);
        alert("Password reset successfully!");
    } catch (error) {
        alert(error.message);
    }
};