import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Course from '@/server/models/Course';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const id = session?.user?.id;

    await connectDB();

    const userCourses = await Course.find({ createdBy: id });

    if (!userCourses || userCourses.length === 0) {
        return NextResponse.json({ message: 'No courses found' }, { status: 404 });
    }

    return NextResponse.json(userCourses, { status: 200 });
}
