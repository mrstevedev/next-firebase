"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthError } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { AUTH_TYPE, ERROR, ROUTE } from "@/constants";
import { doCreateUserWithEmailAndPassword } from "@/services/auth";
import RegisterForm from "@/components/auth/register/RegisterForm";
import CustomAuthError from "@/components/auth/CustomAuthError";

export default function Register() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<ERROR | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError(ERROR.PASSWORDS_DO_NOT_MATCH);
            return;
        }
        try {
            if (!isRegistering) {
                setIsRegistering(true);
                const userCredential = await doCreateUserWithEmailAndPassword(email, password);
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
                setIsRegistering(false);
            }, 1000);
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setIsRegistering(false);
        if (event.target.name === AUTH_TYPE.EMAIL) {
            setEmail(event.target.value);
        } else if (event.target.name === AUTH_TYPE.PASSWORD) {
            setPassword(event.target.value);
        } else if (event.target.name === AUTH_TYPE.PASSWORD_CONFIRM) {
            setConfirmPassword(event.target.value);
        }
    };

    return (
        <Box component="main" display="flex" flexDirection="column" gap={1} height={600} margin={20}>
            <Box
                gap={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                margin={"0 auto"}
                width={300}
            >
                <Typography fontSize={25} fontWeight={600}>
                    Register
                </Typography>
                <RegisterForm
                    email={email}
                    password={password}
                    onSubmit={onSubmit}
                    onChange={onChange}
                    isRegistering={isRegistering}
                />
                <Box gap={1} marginTop={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography>Already have an account?</Typography>{" "}
                    <Typography fontWeight={600}>
                        <Link href={"/login"}>Continue</Link>
                    </Typography>
                </Box>
                <Box gap={1} marginTop={1} display="flex" justifyContent="center" alignItems="center">
                    {error && <Typography color="red">{error}</Typography>}
                </Box>
            </Box>
        </Box>
    );
}
