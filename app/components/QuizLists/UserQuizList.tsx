"use client";
import { useEffect, useState } from 'react';
import { getUserLinks } from '@/lib/getUserLinks';
import QuizListHeader from '@/components/QuizLists/QuizListHeader';
import QuizListPopover from '@/components/QuizLists/QuizListPopover';
import { toast } from "react-toastify"; 
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
  highScore: number | string;
}

export default function UserQuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [quizName, setQuizName] = useState<string>("");

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

  const handleClose = () => {
    setIsOpen(false); 
  }

  const handleOpen = ( quizName ) => {
    setQuizName(quizName);
    setIsOpen(true);
  }
  const handleDelete = async (quizName: string) => {
    try {
      const response = await fetch(`/api/quizzes/${quizName}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete quiz');
      }
      const data = await response.json();

      if (data.message === "Quiz deleted successfully") {
        toast.success("Quiz deleted successfully", {
          position: "top-right",
          style : {
            backgroundColor: "bg-cardBackground",
            color: "black",
            padding: "10px", 
          },
          autoClose: 2000,
          progressClassName: "bg-green-500",
        });
        setQuizzes(quizzes.filter((quiz) => quiz.title !== quizName));
      } else {
        toast.error(data.message, {
          position: "top-right",
          style : {
            backgroundColor: "#F44336",
            color: "white",
            padding: "10px",
          },
          autoClose: 2000,
        });
      }
      
    } catch (error) {
      console.error('Error deleting quiz:', error);
    } finally {
      handleClose(); 
    }
  }

  return (
  <div className="min-h-screen">
    <QuizListHeader
      title="Your Quizzes"
      text="Take a look at the quizzes you have created."
    />

    
      {isOpen && (
        <QuizListPopover quizTitle={quizName} onClose={handleClose} handleDelete={handleDelete} />
      )}
      {quizzes.length === 0 ? (
        <div className="text-center p-4 flex flex-col items-center justify-start min-h-[200px] min-w-[200px] ${
          quizzes.length <= 2 ? 'place-items-center' : ''
        } mt-4">
          <h1 className="text-2xl font-bold mb-4 text-headerText break-words">No quizzes found</h1>
          <p className="text-bodyText break-words">Please navigate via the navigation bar to create a quiz to view.</p>
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 `}>
          {quizzes.map((quiz, i) => (
            <div
              key={i}
              className="p-4 bg-cardBackground shadow-lg rounded min-h-[200px] min-w-[400px] "
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
              {quiz.private ? <p className="mb-2 text-bodyText font-bold"> Privacy: Private Quiz - Viewable only by you</p> : <p className="mb-2 text-bodyText"> Privacy: Public Quiz</p>}
              
              <Link
                href={`/editQuiz/${quiz.title}`}
                className="inline-block px-4 py-2 bg-buttonSecondary text-white rounded hover:bg-buttonSecondaryHover transition-all mr-4"
              >
                Edit Quiz
              </Link>

              <Link
                href={`/quiz/${quiz.title}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-buttonHover transition-all"
              >
                Go to Quiz
              </Link>
              <button
                className="inline-block px-4 py-2 bg-error text-white rounded hover:bg-red-700 transition-all ml-4"
                onClick={() => {
                  handleOpen(quiz.title);
                }}>
                Delete Quiz
              </button>
            </div>
          ))}
        </div>
      )}
  </div>
  );
}