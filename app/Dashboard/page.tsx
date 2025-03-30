"use client";
import React from 'react';
import { signOut } from 'next-auth/react';


const DashboardPage: React.FC = () => {

    return (
        <div className="bg-background min-h-screen flex items-start justify-center pt-24 p-4 w-full">
            <div className="flex flex-col items-start">
                <h1 className="text-bodyText">Dashboard</h1>
                <p className="text-bodyText">Welcome to the Dashboard!</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => signOut()}>Sign Out</button>
            </div>
        </div>
    );
};

export default DashboardPage;