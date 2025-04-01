
import React from 'react';


const DashboardPage: React.FC = () => {
    const features = [
        { name: "Create Quiz", description: "Design and publish question and answer quizzes", link: "/createQuiz" },
        { name: "Your Quizzes", description: "View and manage your quizzes.", link: "/YourQuizzes" },
        { name: "All Quizzes", description: "Explore all available quizzes on the platform.", link: "/Quizzes" },
        { name: "Create Course", description: "Develop and publish a set of Revision notes, complete with ability to Link related Quizzes for organisation.", link: "/createCourse" },
        { name: "All Courses", description: "Browse all available courses on the platform.", link: "/Courses" },
        { name: "Your Courses", description: "Access and manage your courses.", link: "/YourCourses" },
    ];

    return (
        <div className="bg-background min-h-screen flex flex-col items-center justify-start pt-24 p-4 w-full">
            <div className="flex flex-col items-start mb-8">
                <h1 className="text-bodyText text-2xl font-bold">Dashboard</h1>
                <p className="text-bodyText mt-2">Welcome to AccessEdUk! Please explore a look at the features below. Navigation is available through the Navigation bar and also the boxes below. </p>
            </div>
            <h2 className="text-2xl font-semibold text-headerText mb-4">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                
                {features.map((feature, index) => (
                    <a 
                        key={index} 
                        href={feature.link} 
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-lg font-semibold text-blue-600">{feature.name}</h2>
                        <p className="text-bodyText mt-2">{feature.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;