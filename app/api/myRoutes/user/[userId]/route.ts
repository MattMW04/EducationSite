import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';

export async function GET(request: NextRequest, context: { params: Promise<{ userId: string }> }): Promise<NextResponse> {
  const { userId } = await context.params;

  await connectDB();
  const userQuizzes = await Quiz.find({ userId: userId });
  return NextResponse.json(userQuizzes, { status: 200 });
}
