"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPublicLinks } from '@/lib/getPublicLinks';
import QuizListHeader from '@/components/QuizLists/QuizListHeader';

export default function PublicQuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getPublicLinks();
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen mb-4">
        <QuizListHeader
        title="Public Quizzes"
        text="Take a look at the quizzes available for everyone to learn from."
        />
        {quizzes.length === 0 ? (
        <div className="text-center p-4 flex flex-col items-center justify-start min-h-[200px] min-w-[400px] md:min-h-[400px] md:min-w-[600px] mt-4">
          <h1 className="text-2xl font-bold mb-4 text-headerText break-words">No quizzes found</h1>
          <p className="text-bodyText break-words">Please navigate via the navigation bar to create a quiz to view.</p>
        </div>
        ) : (
        <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 min-h-[200px] min-w-[200px] ${
              quizzes.length <= 2 ? 'place-items-center' : ''
            }`}
        >
        {quizzes.map((quiz, i) => (
        <div
            key={i}
            className="p-4 mb-2 bg-cardBackground shadow-lg rounded min-h-[200px] min-w-[400px]"
        >
            <h2 className="text-xl font-bold mb-2 text-headerText">{quiz.title}</h2>
            <p className="mb-2 text-bodyText">{quiz.description}</p>
            {quiz.highScore === "N/A" ? (
              <p className="mb-2 text-bodyText">High Score: Not Attempted</p>
            ) : (
              <p className="mb-2 text-bodyText">
                High Score: {quiz.highScore} / {quiz.questions.length}
              </p>
            )}
            <p className="mb-2 text-bodyText">Difficulty: {quiz.difficulty}</p>
            <Link
                href={`/quiz/${quiz.title}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-buttonHover transition-all"
            >
                Go to Quiz
            </Link>
            </div>
        ))}
        </div>
      )}
    </div>
  );
}
