

import connectDB from "@/server/connectDB.mjs";
import User from "@/server/models/User.mjs";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ message: "Missing username or password" }, { status: 400 });
        }

        await connectDB();

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ message: "Username already taken" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }
}
