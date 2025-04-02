import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Course from '@/server/models/Course';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    try {
        console.log("session check started ");
        const session = await getServerSession(authOptions); 
        if (!session) {
            console.error('No session found');
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { name } = await params;

        await connectDB();

        const course = await Course.find({ title: name });

        if (!course || course.length === 0) {
            return NextResponse.json({ message: "Course not found" }, { status: 404 });
        }

        if (course[0].private && course[0].createdBy.toString() !== session.user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        return NextResponse.json({ data: course, message: "success" }, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/courses/[name]:', error);
        return NextResponse.json({ message: "Internal Server Error: " + error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    try {
        console.log("session check started ");
        const session = await getServerSession({ req: request, ...authOptions });
        if (!session) {
            console.error('No session found');
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { name } = await params;
        const body = await request.json();

        await connectDB();

        const course = await Course.findOne({ title: name });

        if (!course) {
            return NextResponse.json({ message: "Course not found" }, { status: 404 });
        }

        if (course.createdBy.toString() !== session.user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        const updateResult = await Course.updateOne({ title: name }, { $set: body });

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({ message: "No changes made to the course" }, { status: 200 });
        }

        return NextResponse.json({ message: "Course updated successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error in PUT /api/courses/[name]:', error);
        return NextResponse.json({ message: "Internal Server Error: " + error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    try {
        console.log("session check started ");
        const session = await getServerSession({ req: request, ...authOptions });
        if (!session) {
            console.error('No session found');
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { name } = await params;

        await connectDB();

        const course = await Course.findOne({ title: name });

        if (!course) {
            return NextResponse.json({ message: "Course not found" }, { status: 404 });
        }

        if (course.createdBy.toString() !== session.user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        await Course.deleteOne({ title: name });

        // Test deletion
        const deletedCourse = await Course.findOne({ title: name });
        if (deletedCourse) {
            console.error('Course not deleted successfully');
            return NextResponse.json({ message: "Failed to delete course" }, { status: 500 });
        }

        return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error in DELETE /api/courses/[name]:', error);
        return NextResponse.json({ message: "Internal Server Error: " + error }, { status: 500 });
    }
}
