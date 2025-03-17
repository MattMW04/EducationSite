import { cookies } from "next/headers";
import QuizTitle from "@/app/components/Quizzes/QuizTitle";
import QuizWrapper from "@/app/components/Quizzes/QuizWrapper";

async function fetchQuizData(QuizName: string) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('next-auth.session-token')?.value;

    if (!sessionToken) {
        throw new Error('Unauthorized: No session token found');
    }

    const baseurl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseurl}/quizzes/${QuizName}`, {
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            Cookie: `next-auth.session-token=${sessionToken}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch quiz data: ' + response.statusText);
    }

    const quizData = await response.json();
    console.log('Quiz data:', quizData); // Ensure this logs the correct structure
    return quizData;
}

export default async function QuizPage({ params }) {
    const { QuizName } = await params;

    try {
        const quizData = await fetchQuizData(QuizName);

        // Check if quiz data is available
        if (!quizData || !quizData.data || quizData.data.length === 0) {
            return <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold text-center text-headerText">No quiz found</h1>
            </div>;
        }

        // Access the first element of the quizData.data array - enables us to access the quiz object
        const quiz = quizData.data[0];

        // Log the quiz data to verify structure
        console.log('Rendering Quiz with data:', quiz);

        // Correctly access the properties from the quiz object
        const { title, description, quizName } = quiz;

        console.log("title", title);
        console.log("description", description);
        console.log("quizName", quizName);

        return (
            <main className="min-h-screen flex items-center justify-center">
                <QuizWrapper quiz={quiz} />
            </main>
        );
    } catch (error) {
        console.error('Error fetching quiz:', error);
        return <div>{error.message}</div>;
    }
}
