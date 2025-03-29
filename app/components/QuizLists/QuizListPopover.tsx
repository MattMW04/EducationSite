import React from 'react';

interface QuizModalProps {
    quizTitle: string;
    onClose: () => void;
    handleDelete?: (quizName: string) => void;
}
const QuizListPopover: React.FC<QuizModalProps> = ({ quizTitle, onClose, handleDelete }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-cardBackground p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl text-headerText font-bold mb-4"> Warning: Quiz Deletion</h2>
        <p className="text-gray-700">
          <strong>You are about to delete quiz with Title: </strong> {quizTitle} 
            
        </p>
        <p className="text-gray-700 mb-4">
          This action is irreversible and will remove all associated data. Are you sure you want to proceed?
        </p>
        <button
          className="px-4 py-2 mt-2 mr-2 bg-error text-white rounded-md font-medium hover:bg-red-700 transition"
          onClick={() => handleDelete(quizTitle)}
        >
          Confirm Deletion
        </button>
        <button
          className="px-4 py-2 mr-4 bg-buttonPrimary text-white rounded-md font-medium hover:bg-blue-700 transition"
          onClick={onClose}
        >
            Close
        </button>

        
      </div>
    </div>
    );
};

export default QuizListPopover;