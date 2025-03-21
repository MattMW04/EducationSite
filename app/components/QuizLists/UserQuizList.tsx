"use client";
import { useEffect, useState } from 'react';
import { getUserLinks } from '@/lib/getUserLinks';
import QuizListHeader from '@/components/QuizLists/QuizListHeader';
import Link from 'next/link';

interface Quiz {
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
  createdBy: string;
  private: boolean;
}

export default function UserQuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[] | string>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getUserLinks();
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuizzes();
  }
  , []);

  return (
  <div className="min-h-screen">
    <QuizListHeader
      title="Your Quizzes"
      text="Take a look at the quizzes you have created."
    />
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[200px] min-w-[200px] ${
        Array.isArray(quizzes) && quizzes.length <= 2 ? 'place-items-center' : ''
      }`}
    >
      {typeof quizzes === 'string' ? (
        <p>{quizzes}</p>
      ) : (
        quizzes.map((quiz, i) => (
          <div
            key={i}
            className="p-4 bg-cardBackground shadow-lg rounded min-h-[200px] min-w-[400px]"
          >
            <h2 className="text-xl font-bold mb-2 text-headerText">{quiz.title}</h2>
            <p className="mb-2 text-bodyText">{quiz.description}</p>
            <p className="mb-2 text-bodyText">Difficulty: {quiz.difficulty}</p>
            <Link
              href={`/quiz/${quiz.title}`}
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-buttonHover transition-all"
            >
              Go to Quiz
            </Link>
          </div>
        ))
      )}
    </div>
  </div>
  );
}