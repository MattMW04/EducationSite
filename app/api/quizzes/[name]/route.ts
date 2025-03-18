import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest,
{ params }:{ params : Promise<{ name: String}>}
){
    try {
        console.log('Request headers:', request.headers);

        console.log("session check started ");
        const session = await getServerSession({ req: request, ...authOptions });
        console.log('Session:', session);
        if (!session) {
            console.error('No session found');
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { name } = await params;
        console.log(`GET request to /api/quizzes/[${name}]`);

        await connectDB();
        console.log('Connected to DB');
        const quiz = await Quiz.find({ title: name });
        console.log('Quiz:', quiz);

        return NextResponse.json({ data: quiz, message: "success" }, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/quizzes/[name]:', error);
        return NextResponse.json({ message: "Internal Server Error: " + error  }, { status: 500 });
    }
}