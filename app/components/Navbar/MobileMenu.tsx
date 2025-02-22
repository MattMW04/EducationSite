import Link from 'next/link';
import React from 'react';

type HandleToggle = () => void;

interface MobileMenuProps {
    handleToggle: HandleToggle;
}

const MobileMenu: React.FC<MobileMenuProps> = ({handleToggle}) => {
    return (
        <div className="absolute top-0 left-0 w-full bg-gray-800 text-white p-4 z-50">
            <div className="flex justify-between items-center">
                <h2 className="text-lg text-white-500 mr-8">Menu</h2>
                <input type="button" onClick={() => { handleToggle(); }} className="btn text-white absolute top-0 right-0 m-4 bg-red-500 p-1 px-3 text-sm" value="X"/>
            </div>
            <ul className="flex space-y-2 flex-col">
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
    )
};    
export default MobileMenu;    