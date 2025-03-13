import { NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  await connectDB();
  const userQuizzes = await Quiz.find({ userId: params.userId });
  return NextResponse.json(userQuizzes, { status: 200 });
}
