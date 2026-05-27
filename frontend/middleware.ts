import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECREAT_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const userRole = request.cookies.get("user_role")?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin") || pathname.startsWith("/chat")) {
        if (!token) {
            return NextResponse.redirect(new URL("/?error=unauthorized", request.url))
        }

        try {
            const { payload } = await jwtVerify(token, SECREAT_KEY)
            if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
                return NextResponse.redirect(new URL("/?error=unauthorized", request.url));
            }

            if (pathname.startsWith("/chat") && userRole !== "USER") {
                return NextResponse.redirect(new URL("/?error=unauthorized", request.url));
            }
        } catch (error) {
            const response = NextResponse.redirect(new URL("/?error=unauthorized", request.url));
            response.cookies.delete("access_token");
            response.cookies.delete("user_role");
            return response;
        }
    }



    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/chat/:path*"],
}