"use client";
import { useState } from "react";
import { AuthError } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { AUTH_TYPE, ERROR, ROUTE } from "@/constants";
import { doPasswordReset } from "@/services/auth";
import ResetForm from "@/components/reset/ResetForm";
import CustomAuthError from "@/components/auth/CustomAuthError";

export default function Reset() {
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
                await doPasswordReset(email);
                router.push(ROUTE.HOME);
            }
        } catch (error: unknown) {
            const err = CustomAuthError(error as AuthError, password);
            console.log("error in Reset:", err);

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
                    Reset Your Password
                </Typography>
                <ResetForm
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

            <Box gap={1} marginTop={1} display="flex" justifyContent="center" alignItems="center">
                {error ? <Typography color="error">{error}</Typography> : null}
            </Box>
        </Box>
    );
}
