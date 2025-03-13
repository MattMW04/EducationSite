import { NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Incoming quiz data:', data);
    await connectDB();
    const createdQuiz = await Quiz.create({
      ...data
    });
    return NextResponse.json({ message: 'Quiz created', quiz: createdQuiz }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}
