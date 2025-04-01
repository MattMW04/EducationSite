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


        if (quizId == null || score == null) { 
            console.log(quizId, score);
            return NextResponse.json({ message: "Quiz ID and score are required" }, { status: 400 });
        }

        const existingResult = await QuizResult.findOne({ userId: id, quizId });
        if (existingResult) {
            // Update the existing result if the new score is higher
            if (score > existingResult.bestScore) {
                existingResult.bestScore = score;
                existingResult.bestScoreAttemptTime = new Date();
                await existingResult.save();
                return NextResponse.json(existingResult, { status: 200 });
            } else {
                return NextResponse.json({ message: "No update needed" }, { status: 200 });
            }
        }

        // If no existing result, create a new one

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


