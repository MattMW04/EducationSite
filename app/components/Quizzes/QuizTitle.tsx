"use client";
import React from 'react';

interface QuizTitleProps {
  title: string;
  description: string;
  onStart: () => void;
}

const QuizTitle: React.FC<QuizTitleProps> = ({ title, description, onStart }) => {
  return (
    <div className="bg-cardBackground p-8 mt-4 rounded-2xl shadow-lg w-full max-w-4xl text-center mb-4">
      <h2 className="text-headerText text-3xl font-bold mb-4">{title}</h2>
      <p className="text-bodyText text-lg mb-4">{description}</p>
      <div className="flex justify-center">
        <button
          onClick={onStart}
          className="bg-green-500 text-white py-2 px-4 rounded-md font-bold hover:bg-green-600"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizTitle;
