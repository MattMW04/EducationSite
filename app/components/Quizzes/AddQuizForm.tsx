"use client";
import React, { useState, useRef } from 'react';
import FormWrapper from '../AccountForms/FormWrapper';
import { useSession } from 'next-auth/react';
import QuizFormErrorMessage from './QuizFormErrorMessage';
import QuizFormSuccessMessage from './QuizFormSuccessMessage'; // Import success message component
import { set } from 'mongoose';

interface QuizData {
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

export default function AddQuizForm() {
  const { data: session } = useSession();
  const [quiz, setQuiz] = useState<QuizData>({
    title: '',
    description: '',
    difficulty: 'Easy',
    questions: [
      {
        questionText: '',
        options: [{ optionText: '', isCorrect: false }],
      },
    ],
    createdBy: '',
    private: false,
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>(''); // Add success state
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null); // Add success ref

  React.useEffect(() => {
    if (session?.user?.id) {
      setQuiz((prev) => ({ ...prev, createdBy: session.user.id }));
    }
  }, [session]);

  React.useEffect(() => {
    if (error) {
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [error]);

  React.useEffect(() => {
    if (success) {
      successRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [success]);

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { questionText: '', options: [{ optionText: '', isCorrect: false }] },
      ],
    });
  };

  const addOption = (qIndex: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options.push({ optionText: '', isCorrect: false });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const deleteOption = (qIndex: number, oIndex: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    qIndex: number
  ) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].questionText = e.target.value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    qIndex: number,
    oIndex: number
  ) => {
    const updatedQuestions = [...quiz.questions];
    if (e.target.type === 'checkbox') {
      updatedQuestions[qIndex].options[oIndex].isCorrect = e.target.checked;
    } else {
      updatedQuestions[qIndex].options[oIndex].optionText = e.target.value;
    }
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!quiz.title.trim() || !quiz.description.trim() || !quiz.difficulty) {
      setError('Please fill out all required fields.');
      setSuccess(''); // Clear success message
      return;
    }
    for (const question of quiz.questions) {
      if (!question.questionText.trim()) {
        setError('Each question must have text.');
        setSuccess(''); // Clear success message
        return;
      }
      if (!question.options.some((opt) => opt.isCorrect)) {
        setError('Each question must have at least one correct option.');
        setSuccess(''); // Clear success message
        return;
      }
    }
    setError('');
    setSuccess(''); // Reset success message

    const quizData = {
      title: quiz.title,
      description: quiz.description,
      difficulty: quiz.difficulty,
      questions: quiz.questions.map((question) => ({
        questionText: question.questionText,
        options: question.options.map((option) => ({
          optionText: option.optionText,
          isCorrect: option.isCorrect,
        })),
      })),
      createdBy: quiz.createdBy, 
      private: quiz.private
    };

    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });
      console.log('Quiz creation response:', await response.json());

      if (!response.ok) {
        setError('Failed to create quiz. Please try again.');
        setSuccess(''); // Clear success message
        return;
      }
      setSuccess('Quiz created successfully!'); // Set success message
      setError(''); // Clear error message
      setQuiz({
        title: '',  
        description: '',
        difficulty: 'Easy',
        questions: [{ questionText: '', options: [{ optionText: '', isCorrect: false }] }],
        createdBy: session?.user?.id ,
        private: false,
      });
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-start justify-center pt-24 p-4 w-full">
      <main className="flex justify-center items-start w-full">
        <FormWrapper title="Create Quiz">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <QuizFormErrorMessage error={error} errorRef={errorRef} />}
            {success && <QuizFormSuccessMessage success={success} successRef={successRef} />}
            <div>
              <label className="block text-bodyText font-medium mb-1">Title:</label>
              <input
                type="text"
                name="title"
                value={quiz.title}
                onChange={handleChange}
                className="w-full p-3 border border-divider rounded-md bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
              />
            </div>

            <div>
              <label className="block text-bodyText font-medium mb-1">Description:</label>
              <input
                type="text"
                name="description"
                value={quiz.description}
                onChange={handleChange}
                className="w-full p-3 border border-divider rounded-md bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
              />
            </div>

            <div>
              <label className="block text-bodyText font-medium mb-1">Difficulty:</label>
              <select
                name="difficulty"
                value={quiz.difficulty}
                onChange={handleChange}
                className="w-full p-2 border bg-white text-bodyText border-divider rounded"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="flex items-center mt-4">
              <label className="text-bodyText ml-2 mr-2">Private ?</label>
              <input
              type="checkbox"
              name="private"
              checked={quiz.private}
              onChange={(e) => setQuiz({ ...quiz, private: e.target.checked })}
              className="appearance-none w-4 h-4 mr-4 border-2 border-gray-300 relative checked:bg-buttonSecondary checked:border-buttonSecondary transition-all bg-cardBackground "
              />
            </div>

            {/* Questions Section */}
            <div className="mt-6">
              <label className="block mb-2 font-bold text-lg text-bodyText">Questions:</label>
              {quiz.questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="mb-4 p-4 border border-divider rounded bg-cardBackground"
                >
                  <label className="block text-bodyText font-medium mb-1">Question:</label>
                  <input
                    type="text"
                    placeholder="Question text"
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(e, qIndex)}
                    className="w-full p-2 border border-divider rounded mb-2 bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
                  />
                  {question.options.map((option, oIndex) => (
                    <div
                      key={oIndex}
                      className="flex flex-col sm:flex-row items-start sm:items-center mb-2"
                    >
                      <label className="block text-bodyText font-medium mb-1 sm:mb-0 sm:mr-2">
                        Option:
                      </label>
                      <input
                        type="text"
                        placeholder="Answer option"
                        value={option.optionText}
                        onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
                        className="flex-grow p-2 border border-divider rounded mb-2 sm:mb-0 sm:mr-2 bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
                      />
                      <label className="flex items-center space-x-2 p-2 mt-0 sm:mt-0 rounded bg-cardBackground">
                      <span className="text-bodyText">Correct ?</span>
                        <input
                          type="checkbox"
                          checked={option.isCorrect}
                          onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
                          className="appearance-none w-4 h-4 mr-4 border-2 border-gray-300 relative checked:bg-buttonSecondary checked:border-buttonSecondary transition-all bg-cardBackground "
                        />
                        
                      </label>
                      <button
                        type="button"
                        className="py-1 px-3 bg-red-500 text-white rounded ml-2"
                        onClick={() => deleteOption(qIndex, oIndex)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="py-1 px-3 mt-2 bg-buttonPrimary text-buttonText rounded"
                    onClick={() => addOption(qIndex)}
                  >
                    Add Option
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addQuestion}
                className="py-2 px-4 mt-2 bg-buttonSecondary text-buttonText rounded"
              >
                Add Another Question
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-buttonPrimary text-buttonText py-3 rounded-md font-bold hover:bg-buttonHover mt-4 cursor-pointer"
            >
              Create Quiz
            </button>
          </form>
        </FormWrapper>
      </main>
    </div>
  );
}
