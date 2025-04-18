"use client";
import React, { useEffect, useState } from "react";

interface Quiz {
  _id: string;
  title: string;
}

interface QuizDropdownProps {
  selectedQuizzes: string[];
  setSelectedQuizzes: React.Dispatch<React.SetStateAction<string[]>>;
  noQuizzesMessage?: string; 
}

export default function QuizDropdown({
  selectedQuizzes,
  setSelectedQuizzes,
  noQuizzesMessage = "No quizzes available.",
}: QuizDropdownProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("/api/quizzes/user");
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes.");
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        setError("Error fetching quizzes. Please try again.");
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelection = (quizName: string) => {
    setSelectedQuizzes((prevSelected) =>
      prevSelected.includes(quizName)
        ? prevSelected.filter((id) => id !== quizName)
        : [...prevSelected, quizName]
    );
  };

  if (!quizzes || quizzes.length === 0) {
    return <p className="text-bodyText">{noQuizzesMessage}</p>;
  }

  return (
    <div className="mt-4">
      <label className="block text-bodyText font-medium mb-1">Select Quizzes:</label>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="space-y-2">
        {quizzes.map((quiz, index) => (
          <div key={quiz._id} className="flex items-center">
            <input
              type="checkbox"
              id={quiz._id}
              checked={selectedQuizzes.includes(quiz.title)}
              onChange={() => handleQuizSelection(quiz.title)}
              className="appearance-none w-4 h-4 border-2 border-gray-300 relative checked:bg-buttonSecondary checked:border-buttonSecondary transition-all bg-cardBackground mr-2"
            />
            <label htmlFor={quiz._id} className="text-bodyText">
              {quiz.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
