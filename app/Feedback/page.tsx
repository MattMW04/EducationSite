import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'AccessEDUK: Feedback',
    description: 'Provide your feedback about the AccessEDUK application.',
    keywords: 'feedback, AccessEDUK, education, quizzes, accessibility',
};

export default function FeedbackPage() {
    return (
        <main className="min-h-screen items-center text-center bg-background text-white p-6">
            <h1 className="text-headerText justify-center text-2xl font-bold p-2">Feedback</h1>
            <p className="text-bodyText mb-4">Your Feedback is valuable for this site and also for this Dissertation Project. Please share your thoughts with us through the button below or through the embedded Survey on the page. 
            
            </p>
            <Link 
                href="https://app.onlinesurveys.jisc.ac.uk/s/solent/matthew-wilcox-dissertation-project" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Link to the Form
            </Link>
            <div className="flex justify-center w-full items-center mt-4">
                <iframe 
                    src="https://app.onlinesurveys.jisc.ac.uk/s/solent/matthew-wilcox-dissertation-project"
                    className="w-full h-screen mt-4">
                    </iframe>
            </div> 
            
        </main>
    );
}