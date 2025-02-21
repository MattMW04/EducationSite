"use client";

import { useSession } from 'next-auth/react';
import React from 'react';
import { signOut } from 'next-auth/react';

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
const { data: session } = useSession();

if (session) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-sm" role="alert">
                <strong className="font-bold ml-4 mr-4">Error:</strong>
                <span className="block ml-4 mr-4">You are logged in as: {session.user.name}. Due to this, you cannot access this page, please either logout or use our navbar to navigate to a different page</span>
                <input type="button" onClick={()=>{signOut()}} className="btn text-white m-4 bg-red-500 rounded-md px-4 py-2 cursor-pointer hover:bg-red-600" value="Logout" />
            </div>
        </div>
    );
}
    return <>{children}</>;
};

export default AuthCheck;
