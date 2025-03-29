"use client";
import React, { useState } from 'react';
import QuizTitle from './QuizTitle';
import QuizDisplay from './QuizDisplay';

interface QuizWrapperProps {
    quiz: {
      _id: string;
      title: string;
      description: string;
      difficulty: string;
      questions: {
        questionText: string;
        options: {
          optionText: string;
          isCorrect: boolean;
        }[];
      }[];
    };
}

const QuizWrapper: React.FC<QuizWrapperProps> = ({ quiz }) => {
    const [isQuizOpen, setIsQuizOpen] = useState(false);

    const handleQuizStart = () => {
        setIsQuizOpen(true);
    };

    return (
        <main className="flex flex-col justify-center items-center w-full space-y-4">
            <div className="w-full max-w-4xl space-y-4">
                <QuizTitle title={quiz.title} description={quiz.description} onStart={handleQuizStart} />
                {isQuizOpen && <QuizDisplay quiz={quiz} />}
            </div>
        </main>
    );
};

export default QuizWrapper;