import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";


export function middleware(request: NextRequest) {

    const userRole = request.cookies.get("user_role")?.value;

    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
        if (!userRole || userRole !== "ADMID") {
            return NextResponse.redirect(new URL("/?error=unauthorized", request.url));
        }
    }

    if (pathname.startsWith("/chat")) {
        if (!userRole || userRole !== "USER") {
            return NextResponse.redirect(new URL("/?error=unauthorized", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/chat/:path*"],
}