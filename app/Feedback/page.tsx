import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AccessEDUK: Feedback',
    description: 'Provide your feedback about the AccessEDUK application.',
    keywords: 'feedback, AccessEDUK, education, quizzes, accessibility',
};

export default function FeedbackPage() {
    return (
        <main className="flex flex-col min-h-screen items-center bg-background text-white p-6">
            <h1 className="text-headerText text-2xl font-bold p-2">Feedback</h1>
            <p className="text-bodyText ">Your Feedback is valuable for this sight and also for this Dissertation Project. Please share your thoughts with us through this Link to the Form
                This will take you outside of the site and take you to the University&apos;s Form Provider , Jisc, where you can provide your feedback.
            </p>
        </main>
    );
}