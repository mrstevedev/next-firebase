import { ERROR } from "@/constants";
import { AuthError, AuthErrorCodes } from "firebase/auth";

export default function CustomAuthError(error: AuthError, password: string) {
    const errorCode = error.code;
    if (errorCode === AuthErrorCodes.WEAK_PASSWORD) {
        return ERROR.WEAK_PASSWORD;
    } else if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
        return ERROR.EMAIL_EXISTS;
    } else if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
        return ERROR.INVALID_EMAIL;
    } else if (password === "") {
        return ERROR.MISSING_PASSWORD;
    } else if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
        return ERROR.INVALID_EMAIL;
    } else if (errorCode === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        return ERROR.INVALID_LOGIN_CREDENTIALS;
    } else if (errorCode === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
        return ERROR.TOO_MANY_ATTEMPTS_TRY_LATER;
    }

    return error;
}
