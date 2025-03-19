import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const id = session?.user?.id;
    console.log('username:', id);

    await connectDB();
    console.log('Connected to DB');
    const userQuizzes = await Quiz.find({ createdBy: id });
    console.log('User quizzes:', userQuizzes);

    return NextResponse.json(userQuizzes, { status: 200 });
}