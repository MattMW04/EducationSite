import React from 'react';

export const metadata ={
    title: " AccessEdUk : Admin Page",
    description: "Admin Page for AccessEdUk",
};
const AdminPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-headerText">Admin Page</h1>
        </div>
    );
};

export default AdminPage;