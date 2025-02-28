import Link from 'next/link';
import React from 'react';
import {X} from "lucide-react";

type HandleToggle = () => void;

interface MobileMenuProps {
    handleToggle: HandleToggle;
}

const MobileMenu: React.FC<MobileMenuProps> = ({handleToggle}) => {
    return (
        <div className="fixed top-0 right-0 h-full w-64 bg-nav text-white p-4 z-50">
            <div className="absolute top-2 left-0 w-full flex justify-between items-center">
            <h2 className="text-lg text-white-500 ml-4">Menu</h2>
            <button onClick={handleToggle} className="text-white mr-4">
                <X className="w-8 h-8 hover:text-blue-500" size="100" />
            </button>
            </div>
            <div className="mt-16">
            <ul className="flex flex-col space-y-2 mt-4">
            <li className="py-2">
            <Link href="/">Home</Link>
            </li>
            <li className="py-2">
            <Link href="/Account/Login">Login</Link>
            </li>
            <li className="py-2">
            <Link href="/Account/SignUp">Sign up</Link>
            </li>
            </ul>
            </div>
        </div>
    )
};    
export default MobileMenu;    