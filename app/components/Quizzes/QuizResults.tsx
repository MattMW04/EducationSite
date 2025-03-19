import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import QuizTitle from './QuizTitle';

interface QuizResultsProps {
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
  userAnswers: number[];
  onReset: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ quiz, userAnswers, onReset }) => {
  // gets an array of correct answer indexes for each question
  const correctAnswers = quiz.questions.map(question =>
    question.options
      .map((option, i) => option.isCorrect ? i : -1)
      .filter(i => i >= 0)
  );
  // calculates the score by comparing the user's answers to the correct answers
  const score = userAnswers.filter(
    (answer, index) => correctAnswers[index].includes(answer)
  ).length;

  return (
    <div className="mt-8 p-4 border border-divider rounded bg-cardBackground">
      <h2 className="text-2xl font-bold text-center text-headerText">Quiz Results</h2>
      <p className="text-center text-lg text-bodyText">You scored {score} out of {quiz.questions.length}</p>
      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4 p-4 border border-divider rounded bg-cardBackground">
          <h3 className="font-medium mb-2 text-headerText">{question.questionText}</h3>
          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center mb-2">
              <span className="mr-2">
                {userAnswers[qIndex] === oIndex ? (
                  correctAnswers[qIndex].includes(oIndex)
                    ? <CheckCircle className="text-green-500" />
                    : <XCircle className="text-red-500" />
                ) : null}
              </span>
              <span className={correctAnswers[qIndex].includes(oIndex) ? 'font-bold text-green-500' : 'font bold text-red-500'}>
                {option.optionText}
              </span>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={onReset}
        className="w-full py-2 px-4 mt-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition-all"
      >
        Try Again
      </button>
    </div>
  );
};

export default QuizResults;
