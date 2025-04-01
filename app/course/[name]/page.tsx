import React from 'react';
import CourseDetails from '@/app/components/Courses/CourseDetails';

export const metadata = {
    title: 'AccessEDUK: Course Details',
    description: 'View course details',
};

export  default async function CoursePage({ params }) {
    const { name } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <CourseDetails courseName={name} />
        </div>
    );
}
