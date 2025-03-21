import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const id = session?.user?.id;
    

    await connectDB();
    
    const userQuizzes = await Quiz.find({ createdBy: id });

    if (!userQuizzes || userQuizzes.length === 0) {
        return NextResponse.json({ message: 'No quizzes found' }, { status: 404 });
    }
    

    return NextResponse.json(userQuizzes, { status: 200 });
}