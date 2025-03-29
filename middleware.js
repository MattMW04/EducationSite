import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth({
    pages:{
        signIn: "/Account/Login",
    },
});

export async function middleware(req){

    const token = await getToken({ req, secret: process.env.SECRET });

    const { pathname } = req.nextUrl;

    // if user is not logged in and is not on the login page - redirect to login
    if (!token && !pathname.startsWith("/Account/Login") && !pathname.startsWith("/Account/SignUp")) {
        return NextResponse.redirect(new URL("/Account/Login", req.nextUrl.origin));
    }

    // if user is on admin page and not an admin - redirect to /
    if (pathname.startsWith("/admin") && token.role !== "admin") {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    // if user is logged in and tries to direct to login or signup - redirect to /
    if (pathname.startsWith("/Account/Login") || pathname.startsWith("/Account/SignUp")) {
        if(token){
            const url = req.nextUrl.clone();
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = { 
    matcher: [
        "/admin/:path*", 
        "/YourQuizzes/:path*", 
        "/Quizzes/:path*", 
        "/quiz/:path*", 
        "/editQuiz/:path*", 
        "/Dashboard/:path*",
        "/Account/:path*",
    ] 
};

