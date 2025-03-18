import { NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';

export async function GET() {
    console.log('GET request to /api/quizzes');
  await connectDB();
  console.log('Connected to DB');
  const allQuizzes = await Quiz.find({});
  console.log('All quizzes:', allQuizzes);
  const publicQuizzes = await Quiz.find({ private: false });
  console.log ('publicQuizzes:', publicQuizzes);
  return NextResponse.json(publicQuizzes, { status: 200 });
}
