"use client";
import React, { useState } from 'react';
import QuizResults from './QuizResults';

interface QuizDisplayProps {
  quiz: {
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

const QuizDisplay: React.FC<QuizDisplayProps> = ({ quiz }) => {
  // Ensure quiz and quiz.questions are defined
  const questionsLength = quiz?.questions?.length || 0;
  const [userAnswers, setUserAnswers] = useState<number[]>(Array(questionsLength).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (qIndex: number, oIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[qIndex] = oIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setUserAnswers(Array(questionsLength).fill(-1));
    setShowResults(false);
  };

  console.log('quiz:', quiz);
  console.log("title:", quiz.title);
  console.log("description:", quiz.description);
  console.log("difficulty:", quiz.difficulty);

  return (
    <div className="bg-background min-h-screen flex items-start justify-center p-2 mb-4  w-full">
      <main className="flex justify-center items-start w-full">
        <div className="space-y-4 w-full max-w-2xl">
          <p className="text-center text-sm text-bodyText">Difficulty: {quiz.difficulty}</p>
          {quiz.questions && quiz.questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-4 p-4  border border-divider rounded bg-cardBackground">
              <h2 className="font-medium mb-2 text-headerText">{question.questionText}</h2>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    id={`question-${qIndex}-option-${oIndex}`}
                    className="appearance-none w-4 h-4 mr-4 border-2 border-gray-300 rounded-full relative bg-white checked:bg-teal-500 checked:border-teal-500 transition-all"
                    onChange={() => handleOptionChange(qIndex, oIndex)}
                    checked={userAnswers[qIndex] === oIndex}
                  />
                  <label htmlFor={`question-${qIndex}-option-${oIndex}`} className="text-bodyText">
                    {option.optionText}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4  bg-teal-500 text-white font-bold rounded hover:bg-teal-600 transition-all"
          >
            Submit
          </button>
          {showResults && <QuizResults quiz={quiz} userAnswers={userAnswers} onReset={handleReset} />}
        </div>
      </main>
    </div>
  );
};

export default QuizDisplay;
