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

/**
 * QuizResults component displays the results of a quiz taken by the user.
 *
 * @param {QuizResultsProps} props - The properties for the QuizResults component.
 * @param {Quiz} props.quiz - The quiz object containing questions and options.
 * @param {number[]} props.userAnswers - The array of user's selected answer indices.
 *
 * @returns {JSX.Element} The rendered component displaying the quiz results.
 *
 * The component calculates the user's score by comparing their answers to the correct answers.
 * It then displays the score and a detailed breakdown of each question, showing whether the user's
 * selected answer was correct or incorrect.
 */
const QuizResults: React.FC<QuizResultsProps> = ({ quiz, userAnswers, onReset }) => {
    // gets an array of correct answer indices for each question
  const correctAnswers = quiz.questions.map(question => question.options.findIndex(option => option.isCorrect)); 
  // calculates the score by comparing the user's answers to the correct answers
  const score = userAnswers.filter((answer, index) => answer === correctAnswers[index]).length;

  

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
                  option.isCorrect ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )
                ) : null}
              </span>
              <span className={option.isCorrect ? 'font-bold text-green-500' : 'font bold text-red-500'}>
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
