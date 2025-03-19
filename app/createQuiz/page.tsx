import React from 'react';
import AddQuizForm from '@/app/components/Quizzes/AddQuizForm';

export const metadata = {
    title: ' AccessEDUK :Create Quiz',
    description: 'Create a new quiz',
    
};

export default function CreateQuizPage() {
return (
    <div className="min-h-screen flex items-center justify-center">
        <AddQuizForm />
    </div>
    );
}