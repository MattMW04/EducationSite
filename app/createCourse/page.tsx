import React from 'react';
import AddCourseForm from '@/app/components/Courses/AddCourseForm';

export const metadata = {
    title: 'AccessEDUK: Create Course',
    description: 'Create a new course',
};

export default function CreateCoursePage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <AddCourseForm />
        </div>
    );
}
