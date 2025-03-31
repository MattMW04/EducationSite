import React from 'react';
import CourseList from '@/app/components/Courses/CourseList';

export const metadata = {
    title: 'AccessEDUK: Courses',
    description: 'Browse all available courses',
};

export default function CoursesPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <CourseList />
        </div>
    );
}
