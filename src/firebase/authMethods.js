import {
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import {auth} from '@/firebase/config';

// --- EMAIL SIGN-UP ---
export const registerWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        alert(error.message);
    }
};

// --- EMAIL SIGN-IN ---
export const signInWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        alert(error.message);
    }
};

// --- GOOGLE SIGN-IN ---
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        return userCredential.user;
    } catch (error) {
        alert(error.message);
    }
};


// --- GITHUB SIGN-IN ---
const gitHubProvider = new GithubAuthProvider();
export const signInWithGitHub = async () => {
    try {
        const userCredential = await signInWithPopup(auth, gitHubProvider);
        return userCredential.user;
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


