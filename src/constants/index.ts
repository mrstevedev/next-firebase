export enum USER {
    USER_DEFAULT = "NID",
    USER_ADMIN = "admin"
}

export enum ROUTE {
    LOGIN = "/login",
    REGISTER = "/register",
    HOME = "/home"
}

export enum API_ROUTE {
    LOGIN = "/api/login",
    REGISTER = "/api/register"
}

export enum ERROR {
    INVALID_EMAIL = "Invalid email",
    WEAK_PASSWORD = "Password must be at least 6 characters",
    EMAIL_EXISTS = "Email already exists",
    INVALID_LOGIN_CREDENTIALS = "Invalid login credentials",
    MISSING_PASSWORD = "Password is required",
    PASSWORDS_DO_NOT_MATCH = "Passwords do not match",
    TOO_MANY_ATTEMPTS_TRY_LATER = "Too many attempts, try again later"
}

export enum AuthErrorCodes {
    AUTH_INVALID_EMAIL = "auth/invalid-email",
    AUTH_WEAK_PASSWORD = "auth/weak-password",
    AUTH_EMAIL_EXISTS = "auth/email-already-in-use"
}

export enum AUTH_TYPE {
    EMAIL = "email",
    PASSWORD = "password",
    PASSWORD_CONFIRM = "password_confirm"
}

export enum MESSAGE {
    MESSAGE_SUCCESS_USER_CREATED = "success"
}
