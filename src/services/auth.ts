import { auth } from "@/firebase/firebase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updatePassword
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response;
};

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

export const doSignOut = async () => {
    return auth.signOut();
};

export const doPasswordReset = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = async (password: string) => {
    const user = auth.currentUser;
    if (!user) return;
    return updatePassword(user, password);
};

export const doSendEmailVerification = async () => {
    const user = auth.currentUser;
    if (!user) return;
    return sendEmailVerification(user, {
        url: `${window.location.origin}/home`
    });
};
