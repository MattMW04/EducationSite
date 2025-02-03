import { NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import User from '@/server/models/User.mjs';

export async function POST(request: Request) {
    try {
        const { username } = await request.json();

        if (!username) {
            return NextResponse.json({ exists: false, error: 'Username is required' }, { status: 400 });
        }

        
        await connectDB();

        
        const user = await User.findOne({ username: username });

        if (user) {
            return NextResponse.json({ exists: true });
        }

        return NextResponse.json({ exists: false });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ exists: false, error: 'Internal server error' }, { status: 500 });
    }
}