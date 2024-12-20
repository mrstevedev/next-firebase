"use client";
import { ROUTE } from "@/constants";
import { AuthError } from "firebase/auth";
import { Button, Typography } from "@mui/material";
import CustomAuthError from "./CustomAuthError";
import { doSignInWithGoogle } from "@/services/auth";
import { useRouter } from "next/navigation";

const GoogleSignInButton = ({ email, password, isSigningIn, setIsSigningIn }: any) => {
    const router = useRouter();
    const handleLoginSuccess = async (credentialResponse: unknown) => {
        // Handle the successful login response here
        console.log("credentialResponse:", credentialResponse);

        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
                router.push(ROUTE.HOME);
            } catch (error: unknown) {
                return CustomAuthError(error as AuthError, password);
            }
        }
    };

    return (
        <Button
            disabled={isSigningIn}
            onClick={(event) => handleLoginSuccess(event)}
            variant="outlined"
            color="inherit"
            type="button"
            sx={{
                display: "flex",
                paddingTop: "0.625rem",
                paddingBottom: "0.625rem",
                columnGap: "0.75",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.6rem",
                borderWidth: "1px",
                width: "100%",
                fontSize: "0.875",
                lineHeight: "1.25",
                transitionProperty: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "300ms",
                borderColor: "#e4e4e4",
                color: "#333",
                textTransform: "capitalize"
            }}
        >
            <svg
                style={{ width: "1.25rem", height: "1.25rem" }}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_17_40)">
                    <path
                        d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                        fill="#4285F4"
                    />
                    <path
                        d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                        fill="#34A853"
                    />
                    <path
                        d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                        fill="#FBBC04"
                    />
                    <path
                        d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                        fill="#EA4335"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_17_40">
                        <rect width="48" height="48" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            {email && password && isSigningIn ? (
                <Typography fontSize={14} paddingLeft={1}>
                    Signing In...
                </Typography>
            ) : (
                <Typography fontSize={14} paddingLeft={1}>
                    Continue with Google
                </Typography>
            )}
        </Button>
    );
};

export default GoogleSignInButton;
