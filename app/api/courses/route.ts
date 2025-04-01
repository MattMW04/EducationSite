import { NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Course from '@/server/models/Course';

export async function POST(request: Request) {
try {
    const { title, description, chapters, quizzes, createdBy, private: isPrivate } = await request.json();
    console.log('Incoming course data:', { title, description, chapters, quizzes, createdBy, isPrivate });
    await connectDB();

    const createdCourse = await Course.create({
        title,
        description,
        chapters,
        quizzes,
        createdBy,
        private: isPrivate,
    });
    return NextResponse.json({ message: 'Course created', course: createdCourse }, { status: 201 });
    } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
    }
}
