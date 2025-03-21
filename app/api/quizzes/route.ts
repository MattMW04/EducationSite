import { NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { title, description, difficulty, questions, createdBy, private: isPrivate } = await request.json();
    console.log('Incoming quiz data:', { title, description, difficulty, questions, createdBy, isPrivate });
    await connectDB();

    // Validate createdBy field
    let creatorId;
    if (ObjectId.isValid(createdBy)) {
      creatorId = new ObjectId(createdBy);
    } else {
      // Generate a new ObjectId if the provided ID is not valid
      creatorId = new ObjectId();
      console.warn('Invalid createdBy value, generating new ObjectId:', creatorId);
    }

    const createdQuiz = await Quiz.create({
      title,
      description,
      difficulty,
      questions,
      createdBy: creatorId, // Use the validated or generated ObjectId
      private: isPrivate,
    });
    return NextResponse.json({ message: 'Quiz created', quiz: createdQuiz }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}
