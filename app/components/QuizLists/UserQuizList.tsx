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
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

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
  <div className="min-h-screen flex flex-col">
    <QuizListHeader
      title="Your Quizzes"
      text="Take a look at the quizzes you have created."
    />
    <div
      className={` flex items-center justify-center `}
    >
      {quizzes.length === 0 ? (
        <div className="text-center p-4 flex flex-col items-center justify-start min-h-[200px] min-w-[400px] md:min-h-[400px] md:min-w-[600px] mt-4">
          <h1 className="text-2xl font-bold mb-4 text-headerText break-words">No quizzes found</h1>
          <p className="text-bodyText break-words">Please navigate via the navigation bar to create a quiz to view.</p>
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[200px] min-w-[200px] ${
          quizzes.length <= 2 ? 'place-items-center' : ''
        }`}>
          {quizzes.map((quiz, i) => (
            <div
              key={i}
              className="p-4 bg-cardBackground shadow-lg rounded min-h-[200px] min-w-[400px]"
            >
              <h2 className="text-xl font-bold mb-2 text-headerText break-words">{quiz.title}</h2>
              <p className="mb-2 text-bodyText break-words">{quiz.description}</p>
              <p className="mb-2 text-bodyText break-words">Difficulty: {quiz.difficulty}</p>
              {quiz.private ? <p className="mb-2 text-bodyText font-bold break-words">Private Quiz - Viewable only by you</p> : <p className="mb-2 text-bodyText break-words">Public Quiz</p>}
              
              <Link
                href={`/quiz/${quiz.title}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-buttonHover transition-all break-words"
              >
                Go to Quiz
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
}