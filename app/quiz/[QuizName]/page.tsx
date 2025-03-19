import { cookies } from "next/headers";
import QuizWrapper from "@/app/components/Quizzes/QuizWrapper";

async function fetchQuizData(QuizName: string) {
    const cookieStore = await cookies();

    // first try and access the secure cookie - for deployment on Vercel
    let sessionToken = cookieStore.get('__Secure-next-auth.session-token')?.value;
    // set the cookie name to the secure cookie name
    let cookieName = '__Secure-next-auth.session-token';

    // if the secure cookie is not found, try the regular cookie - for local development
    if (!sessionToken){
        sessionToken = cookieStore.get('next-auth.session-token')?.value;
        // set the cookie name to the regular cookie name
        cookieName = 'next-auth.session-token';
    }

    if (!sessionToken) {
        throw new Error('Unauthorized: No session token found');
    }
    const baseurl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseurl}/quizzes/${QuizName}`;
    const headers = {
        'Authorization': `Bearer ${sessionToken}`,
        Cookie: `${cookieName}=${sessionToken}` 
    };
    try {
        const response = await fetch(url, {
            headers,
            credentials: 'include'
        });

        if (!response.ok) {
            
            throw new Error('Failed to fetch quiz data: ' + response.statusText);
        }

        const quizData = await response.json();
        return quizData;
    } catch (error) {
        console.error('Error during fetch:', error);
        throw error;
    }
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
        return <div className="min-h-screen flex items-center justify-center">{error.message}</div>;
    }
}
