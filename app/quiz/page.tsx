import React from 'react';
import QuizDisplay from '@/app/components/Quizzes/QuizDisplay';

const sampleQuiz = {
  title: 'Sample Quiz',
  description: 'This is a sample quiz description.',
  difficulty: 'Medium',
  questions: [
    {
      questionText: 'What is the capital of France?',
      options: [
        { optionText: 'Paris', isCorrect: true },
        { optionText: 'London', isCorrect: false },
        { optionText: 'Berlin', isCorrect: false },
        { optionText: 'Madrid', isCorrect: false },
      ],
    },
    {
      questionText: 'Which planet is known as the Red Planet?',
      options: [
        { optionText: 'Earth', isCorrect: false },
        { optionText: 'Mars', isCorrect: true },
        { optionText: 'Jupiter', isCorrect: false },
        { optionText: 'Saturn', isCorrect: false },
      ],
    },
  ],
};

export default function CreateQuizPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <QuizDisplay quiz={sampleQuiz} />
    </div>
  );
}