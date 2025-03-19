import React, { RefObject } from 'react';

interface QuizFormErrorMessageProps {
  error: string;
  errorRef?: RefObject<HTMLDivElement>;
}

export default function QuizFormErrorMessage({ error, errorRef }: QuizFormErrorMessageProps) {
  return (
    <div ref={errorRef} className="flex items-center justify-center w-full mt-4 mb-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-sm" role="alert">
        <strong className="font-bold mr-4 block">Quiz Error</strong>
        <span className="block">Error: {error}</span>
      </div>
    </div>
  );
}
