"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { AUTH_TYPE } from "@/constants";

type AuthContextType = {
    currentUser: User;
    userLoggedIn: boolean;
    isEmailUser: boolean;
    isGoogleUser: boolean;
    setCurrentUser: (user: User) => void;
    setIsGoogleUser: (user: boolean) => void;
};

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user: User | null) {
        if (user) {
            setCurrentUser({ ...user });
            const isEmail = user.providerData.some((provider) => provider.providerId === AUTH_TYPE.PASSWORD);
            setIsEmailUser(isEmail);
            setUserLoggedIn(true);
        } else {
            setCurrentUser({} as User);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        isEmailUser,
        isGoogleUser,
        setCurrentUser,
        setIsGoogleUser
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
