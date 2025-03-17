import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';

export async function GET(request: NextRequest,
  { params }:{ params : Promise<{ userId: String}>}
){
  const { userId } = await params;
  console.log('GET request to /api/myRoutes/user/[userId]');
  console.log('userId:', userId);


  await connectDB();
  console.log('Connected to DB');
  const userQuizzes = await Quiz.find({ createdBy: userId });
  console.log('User quizzes:', userQuizzes);
  return NextResponse.json(userQuizzes, { status: 200 });
}


