import { i18nRouter } from "next-i18n-router";
import { NextRequest, NextResponse } from "next/server";
import i18nConfig from "../i18nConfig";

// add basic auth for the staging environment
function isAuthenticated(request: NextRequest) {
    const auth = request.headers.get("Authorization");
    if (auth && process.env.STAGING_BASIC_AUTH) {
        const [user, pass] = process.env.STAGING_BASIC_AUTH?.split(":");
        const [username, password] = atob(auth.split(" ")[1]).split(":");
        return username === user && password === pass;
    }
    return false;
}

export function middleware(request: NextRequest) {
    if (request.url.includes("/api")) {
        return NextResponse.next();
    }

    if (process.env.STAGING_BASIC_AUTH) {
        if (!isAuthenticated(request)) {
            return new NextResponse("Authentication required.", {
                status: 401,
                headers: {
                    "WWW-Authenticate": `Basic`,
                },
            });
        }
    }
    if (request.nextUrl.locale === "default") {
        return NextResponse.redirect(
            new URL(`/en${request.nextUrl.pathname}`, request.url)
        );
    }
    return i18nRouter(request, i18nConfig);
}

export const config = {
    matcher: "/((?!static|.*\\..*|_next).*)",
};
