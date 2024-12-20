"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthError } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Box, Typography, Divider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AUTH_TYPE, ERROR, ROUTE } from "@/constants";
import { doSignInWithEmailAndPassword } from "@/services/auth";
import LoginForm from "@/components/auth/login/LoginForm";
import CustomAuthError from "@/components/auth/CustomAuthError";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [error, setError] = useState<ERROR | null>(null);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (!isSigningIn) {
                setIsSigningIn(true);
                const userCredential = await doSignInWithEmailAndPassword(email, password);
                const idToken = await userCredential.user.getIdToken();
                document.cookie = `token=${idToken}; path=/`;
                router.push(ROUTE.HOME);
            }
        } catch (error: unknown) {
            const err = CustomAuthError(error as AuthError, password);

            setTimeout(() => {
                setError(err as ERROR);
            }, 1000);
        } finally {
            setTimeout(() => {
                setIsSigningIn(false);
            }, 1000);
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setIsSigningIn(false);
        if (event.target.name === AUTH_TYPE.EMAIL) {
            setEmail(event.target.value);
        } else if (event.target.name === AUTH_TYPE.PASSWORD) {
            setPassword(event.target.value);
        }
    };

    return (
        <Box gap={1} component="main" width={380} height={600} display="flex" margin={"10rem auto"} flexDirection="column">
            <Box
                gap={1}
                width={380}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                margin="0 auto"
            >
                <Typography fontSize={25} fontWeight={600}>
                    Welcome Back
                </Typography>
                <LoginForm
                    error={error}
                    email={email}
                    password={password}
                    onSubmit={onSubmit}
                    onChange={onChange}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    isSigningIn={isSigningIn}
                />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                <Typography>Dont have an account?</Typography>{" "}
                <Typography fontWeight={600}>
                    <Link href={"/register"}>Sign up</Link>
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                <Divider sx={{ width: "380px", marginBottom: 1 }}>OR</Divider>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                <GoogleOAuthProvider clientId="446065887938-3lhjnndtefga5lj5cdg0n14if6h1nubj.apps.googleusercontent.com">
                    <GoogleSignInButton
                        email={email}
                        password={password}
                        setIsSigningIn={setIsSigningIn}
                        isSigningIn={isSigningIn}
                        setError={setError}
                    />
                </GoogleOAuthProvider>
            </Box>
            <Box gap={1} marginTop={1} display="flex" justifyContent="center" alignItems="center">
                {error ? <Typography color="error">{error}</Typography> : null}
            </Box>
        </Box>
    );
}
