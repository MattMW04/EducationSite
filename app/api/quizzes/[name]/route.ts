import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';
import QuizResults from '@/server/models/QuizResults.mjs';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest,
{ params }:{ params : Promise<{ name: String}>}
){
    try {

        console.log("session check started ");
        const session = await getServerSession({ req: request, ...authOptions });
        if (!session) {
            console.error('No session found');
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { name } = await params;

        await connectDB();
        
        const quiz = await Quiz.find({ title: name });
        
        if (!quiz || quiz.length === 0) {
            return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
        }

        if( quiz[0].private && quiz[0].createdBy.toString() !== session.user.id){
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        return NextResponse.json({ data: quiz, message: "success" }, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/quizzes/[name]:', error);
        return NextResponse.json({ message: "Internal Server Error: " + error  }, { status: 500 });
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

        const quiz = await Quiz.findOne({ title: name });

        if (!quiz) {
            return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
        }

        if (quiz.createdBy.toString() !== session.user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        const updateResult = await Quiz.updateOne({ title: name }, { $set: body });

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({ message: "No changes made to the quiz" }, { status: 200 });
        }

        return NextResponse.json({ message: "Quiz updated successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error in PUT /api/quizzes/[name]:', error);
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

        const quiz = await Quiz.findOne({ title: name });

        if (!quiz) {
            return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
        }

        if (quiz.createdBy.toString() !== session.user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        await Quiz.deleteOne({ title: name });

        await QuizResults.deleteMany({ quizId: quiz._id });

        // test deletion from both 
        const deletedQuiz = await Quiz.findOne({ title: name });
        if (deletedQuiz) {
            console.error('Quiz not deleted successfully');
            return NextResponse.json({ message: "Failed to delete quiz" }, { status: 500 });
        }
        // test deletion from quiz results
        const quizResults = await QuizResults.find({ quizId: quiz._id });
        if (quizResults.length > 0) {
            console.error('Quiz results not deleted successfully');
            return NextResponse.json({ message: "Failed to delete quiz with associating results" }, { status: 500 });
        }
        return NextResponse.json({ message: "Quiz deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error in DELETE /api/quizzes/[name]:', error);
        return NextResponse.json({ message: "Internal Server Error: " + error }, { status: 500 });
    }
}