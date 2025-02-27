import React, { ReactNode } from 'react';

interface FormWrapperProps {
    children: ReactNode;
    title: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, title }) => (
    <div className="bg-cardBackground p-8 rounded-2xl shadow-lg w-full max-w-4xl min-h-[500px]">
        {title !== "" && <h2 className="text-headerText text-3xl font-bold text-center mb-6">{title}</h2>}
        {children}
    </div>
);

export default FormWrapper;