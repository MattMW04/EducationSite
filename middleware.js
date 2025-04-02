import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth({
    pages:{
        signIn: "/Account/Login",

        
    },
});

export async function middleware(req){

    const cookies = req.cookies;

    // Check for both possible cookie names
    const hasDefaultCookie = cookies.has("next-auth.session-token");
    const hasSecureCookie = cookies.has("__Secure-next-auth.session-token");

    // Determine which cookie name to use
    const cookieName = hasSecureCookie 
    ? "__Secure-next-auth.session-token" 
    : "next-auth.session-token";

    

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, headers: req.headers, cookies, cookieName : cookieName });

    

    const { pathname } = req.nextUrl;

    // If no token exists, allow access to login/signup pages
    if (!token && (pathname.startsWith("/Account/Login") || pathname.startsWith("/Account/SignUp") || pathname.startsWith("/Feedback"))) {
        return NextResponse.next();
    }

    // If no token exists and user tries to access protected routes, redirect to login
    if (!token) {
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
        "/createQuiz/:path*",
        "/editQuiz/:path*", 
        "/Dashboard/:path*",
        "/Account/:path*",
        "/YourCourses/:path*",
        "/Courses/:path*",
        "/course/:path*",
        "/createCourse/:path*",
        "/editCourse/:path*",
    ] 
};