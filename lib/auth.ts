import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/server/connectDB.mjs";
import User from "@/server/models/User.mjs";
import bcrypt from "bcrypt";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Please provide both username and password.");
                }

                try{
                    await connectDB();
                } catch (error) {
                    throw new Error("Failed to connect to the database.");
                }

                const user = await User.findOne({ username: credentials.username });
                if (!user) {
                    throw new Error("Username not found. Please check your username and try again.");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Incorrect password. Please check your password and try again.");
                }

                return { id: user._id.toString(), name: user.username, email: user.email, role: user.role };
            },
        }),
        GitHubProvider({
            clientId: process.env.GH_OA_ID,
            clientSecret: process.env.GH_OA_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OA_ID,
            clientSecret: process.env.GOOGLE_OA_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.userName = user.name;
                token.role = user.role ?? "user";
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.userName) {
                session.user = {
                    id: token.id as string,
                    name: token.userName as string,
                    role: token.role as string,
                };
            }
            return session;
        },
    },
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Use "lax" for development and "none" for production
                secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
                path: "/",
            },
        },
    },

    debug: process.env.NODE_ENV === "development",
};