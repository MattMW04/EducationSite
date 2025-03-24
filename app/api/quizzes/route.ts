import { NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';

export async function POST(request: Request) {
  try {
    const { title, description, difficulty, questions, createdBy, private: isPrivate } = await request.json();
    console.log('Incoming quiz data:', { title, description, difficulty, questions, createdBy, isPrivate });
    await connectDB();

    

    const createdQuiz = await Quiz.create({
      title,
      description,
      difficulty,
      questions,
      createdBy: createdBy,
      private: isPrivate,
    });
    return NextResponse.json({ message: 'Quiz created', quiz: createdQuiz }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}
