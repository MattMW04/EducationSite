import { NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Course from '@/server/models/Course';

export async function GET() {
    await connectDB();
    const publicCourses = await Course.find({ private: false });
    return NextResponse.json(publicCourses, { status: 200 });
}
