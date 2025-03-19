
import { NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';

export async function GET() {
    await connectDB();
    const publicQuizzes = await Quiz.find({ private: false });
    return NextResponse.json(publicQuizzes, { status: 200 });
}