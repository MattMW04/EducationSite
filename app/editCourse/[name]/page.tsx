import React from 'react';
import EditCourseForm from '@/app/components/Courses/EditCourseForm';

export const metadata = {
    title: 'AccessEDUK: Edit Course',
    description: 'Edit an existing course',
};

export default function EditCoursePage({ params }) {
    const { name } = params;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <EditCourseForm courseName={name} />
        </div>
    );
}
