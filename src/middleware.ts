import { type NextRequest, NextResponse } from "next/server";
import { ROUTE } from "@/constants/index";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("token")?.value;

    // Protect all routes except login and register
    if (!token && pathname !== ROUTE.LOGIN && !token && pathname !== ROUTE.REGISTER)
        return NextResponse.redirect(new URL(ROUTE.LOGIN, request.url));

    // Redirect to home page if logged in
    if ((token && pathname === ROUTE.LOGIN) || (token && pathname === ROUTE.REGISTER))
        return NextResponse.redirect(new URL(ROUTE.HOME, request.url));

    return NextResponse.next();
}
export const config = {
    matcher: ["/", "/home", "/login", "/register", "/upload", "/profile"]
};
