import React from 'react';


const DashboardPage: React.FC = () => {

    return (
        <div className="bg-background min-h-screen flex items-start justify-center pt-24 p-4 w-full">
            <div className="flex flex-col items-start">
                <h1 className="text-bodyText">Dashboard</h1>
                <p className="text-bodyText">Welcome to the Dashboard!</p>
            </div>
        </div>
    );
};

export default DashboardPage;