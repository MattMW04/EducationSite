import React from 'react';
import FormWrapper from '@/app/components/AccountForms/FormWrapper';

const EmptyComponent: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <FormWrapper title="Admin Sign Up">
                <p>This is an empty component. It is used to demonstrate how to create a new component.</p>

            </FormWrapper>
        </div>
    );
};

export default EmptyComponent;
