import React, { RefObject } from 'react';

interface QuizFormSuccessMessageProps {
  success: string;
  successRef?: RefObject<HTMLDivElement>;
}

export default function QuizFormSuccessMessage({ success, successRef }: QuizFormSuccessMessageProps) {
  return (
    <div ref={successRef} className="flex items-center justify-center w-full mt-4 mb-4">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-full max-w-sm" role="alert">
        <strong className="font-bold mr-4 block">Success</strong>
        <span className="block">{success}</span>
      </div>
    </div>
  );
}
