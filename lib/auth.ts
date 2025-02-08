import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/server/connectDB.mjs";
import User from "@/server/models/User.mjs";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
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

                await connectDB();

                const user = await User.findOne({ username: credentials.username });
                if (!user) {
                    throw new Error("Username not found. Please check your username and try again.");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                console.log("Credentials Password:  ", credentials.password);
                console.log("User Password:  ", user.password);
                console.log("isPasswordValid:", isPasswordValid);
                if (!isPasswordValid) {
                    throw new Error("Incorrect password. Please check your password and try again.");
                }

                return { id: user._id.toString(), name: user.username};
            },
        }),
        GitHubProvider({
            clientId: process.env.GH_OA_ID,
            clientSecret: process.env.GH_OA_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.username) {
                session.user = {
                    name: token.username as string,
                };
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
};