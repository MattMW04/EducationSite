import { cookies } from "next/headers";
import QuizTitle from "@/app/components/Quizzes/QuizTitle";
import QuizWrapper from "@/app/components/Quizzes/QuizWrapper";

async function fetchQuizData(QuizName: string) {
    const cookieStore = await cookies();

    // first try and access the secure cookie - for deployment on Vercel
    let sessionToken = cookieStore.get('__Secure-next-auth.session-token')?.value;

    // if the secure cookie is not found, try the regular cookie - for local development
    if (!sessionToken){
        sessionToken = cookieStore.get('next-auth.session-token')?.value;
    }
    
    

    // Additional logging
    console.log('Cookies:', cookieStore.getAll());
    console.log('Session token:', sessionToken);

    if (!sessionToken) {
        throw new Error('Unauthorized: No session token found');
    }

    const baseurl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseurl}/quizzes/${QuizName}`;
    const headers = {
        'Authorization': `Bearer ${sessionToken}`,
        Cookie: `next-auth.session-token=${sessionToken}`
    };

    // Log the request details
    console.log('Fetching quiz data from:', url);
    console.log('Request headers:', headers);

    try {
        const response = await fetch(url, {
            headers,
            credentials: 'include'
        });

        // Log the response status and headers
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Fetch error response:', errorText);
            throw new Error('Failed to fetch quiz data: ' + response.statusText);
        }

        const quizData = await response.json();
        console.log('Quiz data:', quizData); // Ensure this logs the correct structure
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
        return <div>{error.message}</div>;
    }
}
