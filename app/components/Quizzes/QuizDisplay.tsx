"use client";
import React, { useState } from 'react';
import QuizResults from './QuizResults';

interface QuizDisplayProps {
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

const saveQuizScore = async (quizId: string, score: number, ) => {
  try {
    const response = await fetch('/api/QuizResults', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quizId, score }),
    });
    if (!response.ok) {
      throw new Error('Failed to save quiz score');
    }
    return await response;
  } catch (error) {
    console.error('Error saving quiz score:', error);
  }
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({ quiz }) => {
  // Ensure quiz and quiz.questions are defined
  const questionsLength = quiz?.questions?.length || 0;
  const [userAnswers, setUserAnswers] = useState<number[]>(Array(questionsLength).fill(-1)); // initialize userAnswers array with -1 in each index to be replaced by option index of answer 
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (qIndex: number, oIndex: number) => {
    const newAnswers = [...userAnswers]; // copy userAnswers array
    newAnswers[qIndex] = oIndex; // update option index (option chosen for answer_ for given question )
    setUserAnswers(newAnswers);
  };

  const handleSubmit =  async ()  => {
    try{
      const score = userAnswers.reduce((acc, answer, index) => {
        if (answer !== -1 && quiz.questions[index].options[answer].isCorrect) {
          return acc + 1; // increment score for correct answer
        }
        return acc;
      }, 0);

      
      // Save the score to the database or perform any other action here
      const response = await saveQuizScore(quiz._id, score); 
      console.log('Score:', score);
      console.log(quiz._id) // quiz._id is the quiz ID

      if (response.status !== 201) {
        throw new Error('Failed to save quiz score');
      }

    } catch (error) {
      console.error('Error calculating score:', error);
    }
    // Show results after submitting the quiz
    setShowResults(true);
  };

  const handleReset = () => {
    setUserAnswers(Array(questionsLength).fill(-1));
    setShowResults(false);
  };

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
