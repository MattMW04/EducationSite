import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/server/connectDB.mjs";
import QuizResult from "@/server/models/QuizResults.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const id = session?.user?.id;

    await connectDB();

    const quizResults = await QuizResult.find({ userId: id });

    if (!quizResults || quizResults.length === 0) {
        return NextResponse.json({ message: "No quiz results found" }, { status: 404 });
    }

    return NextResponse.json(quizResults, { status: 200 });
}

export async function POST(request: NextRequest) {
    try{

        const session = await getServerSession(authOptions);
        const id = session?.user?.id;

        await connectDB();

        const body = await request.json();
        const { quizId, score } = body;

        if (!quizId || !score) {
            return NextResponse.json({ message: "Quiz ID and score are required" }, { status: 400 });
        }

        const newResult = new QuizResult({
            userId: id,
            quizId,
            bestScore: score,
            bestScoreAttemptTime: new Date(),
        });

        await newResult.save();

        const savedResult = await QuizResult.findById(newResult._id);

        if (!savedResult) {
            return NextResponse.json({ message: "Failed to save quiz result" }, { status: 500 });
        }

        return NextResponse.json(newResult, { status: 201 });
    }catch (error) {
        console.error("Error saving quiz result:", error);
        return NextResponse.json({ message: "Error saving quiz result" }, { status: 500 });
    }
}

export async function UPDATE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const id = session?.user?.id;

        await connectDB();

        const body = await request.json();
        const { quizId, score } = body;

        if (!quizId || !score) {
            return NextResponse.json({ message: "Quiz ID and score are required" }, { status: 400 });
        }

        const updatedResult = await QuizResult.findOneAndUpdate(
            { userId: id, quizId },
            { score, bestScoreAttemptTime: new Date() },
            { new: true }
        );

        if (!updatedResult) {
            return NextResponse.json({ message: "Failed to update quiz result" }, { status: 404 });
        }

        return NextResponse.json(updatedResult, { status: 200 });
    } catch (error) {
        console.error("Error updating quiz result:", error);
        return NextResponse.json({ message: "Error updating quiz result" }, { status: 500 });
    }
}
